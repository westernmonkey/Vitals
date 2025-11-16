import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Vapi from '@vapi-ai/web'
import { motion } from 'framer-motion'
import LogoLoop from './components/LogoLoop'
import { FaHeartbeat, FaStethoscope, FaHospital, FaUserMd, FaPills, FaXRay, FaSyringe, FaBandAid, FaThermometerHalf, FaMicroscope, FaLungs, FaBrain, FaEye, FaTooth, FaProcedures, FaNotesMedical, FaClinicMedical, FaUserNurse, FaAmbulance } from 'react-icons/fa'
import { getRecommendedTests, getPossibleDiagnosis } from './utils/medicalProtocols'
import Groq from 'groq-sdk'
import './App.css'

const VAPI_API_KEY = (import.meta as any).env?.VITE_VAPI_API_KEY || 'b55f8d05-286e-4735-8566-5bd62508d6b8'
const ASSISTANT_ID = (import.meta as any).env?.VITE_VAPI_ASSISTANT_ID || '30e8daae-a65e-47ec-98af-e0d329311fcd'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

interface ConversationData {
  messages: Message[]
  patientName?: string
  patientAge?: string
  patientGender?: string
  chiefComplaint?: string
  symptoms?: string[]
  medicalHistory?: string
  allergies?: string[]
  medications?: string[]
  chronicConditions?: string[]
  aiAnalysis?: string
  keyFindings?: string[]
  recommendations?: string[]
  pdfContent?: string
  pdfSummary?: string
  possibleDiagnosis?: string[]
  recommendedTests?: string[]
  insuranceClaimData?: any
  sickLeaveData?: any
  doctorNotes?: string[]
  consultationActive?: boolean
}

function Landing() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/voice')
  }

  return (
    <div className="landing-page-cluely">
      {/* Header */}
      <motion.header 
        className="landing-header-cluely"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content-cluely">
          <div className="logo-cluely">
            <span className="logo-text-cluely">Vitals</span>
          </div>
          <nav className="header-nav-cluely">
            <a href="#pricing">Pricing</a>
            <a href="#enterprise">Enterprise</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="landing-main-cluely">
        <motion.div 
          className="landing-hero-cluely"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-headline-cluely">
            AI assistant for healthcare
          </h1>
          <motion.p 
            className="hero-subheadline-cluely"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Real-time insights. Better care.
          </motion.p>
          <div className="cta-buttons-cluely">
            <motion.button 
              className="cta-button-primary" 
              onClick={handleStart}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="cta-icon-cluely">▶</span>
              Get Started
            </motion.button>
          </div>
        </motion.div>

        {/* Product Preview Window */}
        <motion.div 
          className="product-preview-cluely"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div 
            className="mac-window-cluely metallic-frame"
            whileHover={{ 
              scale: 1.02,
              rotateY: 2,
              rotateX: -1
            }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="window-controls-cluely">
              <span className="control-cluely red"></span>
              <span className="control-cluely yellow"></span>
              <span className="control-cluely green"></span>
            </div>
            <div className="window-content-cluely">
              <motion.div 
                className="preview-interface-cluely"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="preview-header-cluely">
                  <motion.span 
                    className="preview-badge-cluely"
                    animate={{ 
                      boxShadow: [
                        "0 0 0px rgba(7, 133, 84, 0.4)",
                        "0 0 20px rgba(7, 133, 84, 0.6)",
                        "0 0 0px rgba(7, 133, 84, 0.4)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    AI Active
                  </motion.span>
                </div>
                <div className="preview-transcript-cluely">
                  <div className="transcript-label-cluely">MEDICAL HISTORY</div>
                  <motion.div 
                    className="transcript-text-cluely metallic-box"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    "Headaches for 3 days. Allergic to penicillin. Taking blood pressure meds."
                  </motion.div>
                  <div className="preview-actions-cluely">
                    <motion.button 
                      className="preview-action-btn-cluely"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Generate Report
                    </motion.button>
                    <motion.button 
                      className="preview-action-btn-cluely"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ask Questions
                    </motion.button>
                  </div>
                  <motion.div 
                    className="preview-input-cluely"
                    whileHover={{ borderColor: "#078554" }}
                  >
                    <span className="input-placeholder-cluely">Ask about symptoms, ⌘K</span>
                    <span className="keyboard-icon-cluely">⌘</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Healthcare Logos Loop - Below Desktop */}
        <motion.div
          className="logos-section-cluely"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <LogoLoop
            logos={[
              { node: <FaHeartbeat />, title: "Cardiology" },
              { node: <FaStethoscope />, title: "General Practice" },
              { node: <FaHospital />, title: "Hospital" },
              { node: <FaUserMd />, title: "Doctor" },
              { node: <FaPills />, title: "Pharmacy" },
              { node: <FaXRay />, title: "Radiology" },
              { node: <FaSyringe />, title: "Vaccination" },
              { node: <FaBandAid />, title: "First Aid" },
              { node: <FaThermometerHalf />, title: "Diagnostics" },
              { node: <FaMicroscope />, title: "Laboratory" },
              { node: <FaLungs />, title: "Pulmonology" },
              { node: <FaBrain />, title: "Neurology" },
              { node: <FaEye />, title: "Ophthalmology" },
              { node: <FaTooth />, title: "Dentistry" },
              { node: <FaProcedures />, title: "Surgery" },
              { node: <FaNotesMedical />, title: "Medical Records" },
              { node: <FaClinicMedical />, title: "Clinic" },
              { node: <FaUserNurse />, title: "Nursing" },
              { node: <FaAmbulance />, title: "Emergency" },
            ]}
            speed={40}
            direction="left"
            logoHeight={28}
            gap={40}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Healthcare services"
          />
        </motion.div>
      </div>
    </div>
  )
}

function VoiceSession() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking' | 'listening'>('idle')
  const [transcript, setTranscript] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfContent, setPdfContent] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  
  const vapiRef = useRef<Vapi | null>(null)
  const isConnectedRef = useRef(false)
  const messagesRef = useRef<Message[]>([])

  // Update ref whenever messages change
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // Auto-scroll to bottom when new messages arrive (only scroll the messages container)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      console.log('PDF selected:', file.name)
      
      // Process PDF with Gemini API
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        // Convert PDF to base64 for Gemini
        const reader = new FileReader()
        reader.onload = async (event) => {
          const arrayBuffer = event.target?.result as ArrayBuffer
          const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
          
          // Send to Gemini for analysis
          const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyB_wmrEbTz9YJlMUvNDFaUwcoJCyf1AuVE'
          
          try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Analyze this medical history PDF and provide a comprehensive summary in bullet points. Include: past diagnoses, medications, surgeries, allergies, chronic conditions, and key medical events. Format as a clear, organized summary.`
                  }, {
                    inline_data: {
                      mime_type: 'application/pdf',
                      data: base64
                    }
                  }]
                }]
              })
            })
            
            const data = await response.json()
            if (data.candidates && data.candidates[0]?.content?.parts) {
              const summary = data.candidates[0].content.parts[0].text
              setPdfContent(summary)
              console.log('PDF summary generated:', summary)
            } else {
              setPdfContent('PDF uploaded - analysis pending')
            }
          } catch (error) {
            console.error('Error processing PDF with Gemini:', error)
            setPdfContent('PDF uploaded - analysis pending')
          }
        }
        reader.readAsArrayBuffer(file)
      } catch (error) {
        console.error('Error reading PDF:', error)
        setPdfContent('PDF uploaded - unable to process')
      }
    }
  }

  useEffect(() => {
    const vapi = new Vapi(VAPI_API_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => {
      console.log('✅ Call started')
      setStatus('connected')
      isConnectedRef.current = true
    })

      vapi.on('call-end', async () => {
        console.log('🛑 Call ended')
        setStatus('idle')
        isConnectedRef.current = false
        
        // Use ref to get latest messages
        const allMessages = messagesRef.current
        console.log('📝 All messages collected:', allMessages)
        
        // Extract information from conversation using LLM
        const extracted = await extractInformationFromConversation(allMessages)
        
        // Get medical protocol recommendations
        const symptoms = extracted.symptoms || []
        const recommendedTests = getRecommendedTests(symptoms)
        const possibleDiagnosis = getPossibleDiagnosis(symptoms)
        
        const finalData: ConversationData = {
          messages: allMessages,
          ...extracted,
          pdfContent: pdfContent,
          pdfSummary: pdfContent, // Store PDF summary separately
          recommendedTests: recommendedTests,
          possibleDiagnosis: possibleDiagnosis
        }
        
        console.log('📊 Extracted data:', finalData)
        
            // Send to post-Jamie screen first
            setTimeout(() => {
              navigate('/post-jamie', { state: finalData })
            }, 500)
      })

    vapi.on('speech-start', () => {
      setStatus('listening')
    })

    vapi.on('speech-end', () => {
      setStatus('connected')
    })

    vapi.on('message', (message: any) => {
      console.log('📨 Received message:', message)
      
      // Handle different message types
      let transcriptText = ''
      let role: 'user' | 'assistant' = 'assistant'
      
      if (message.type === 'transcript' || message.transcript) {
        transcriptText = message.transcript || message.text || ''
        role = message.role || (message.type === 'user-message' ? 'user' : 'assistant')
      } else if (message.text) {
        transcriptText = message.text
        role = message.role || 'assistant'
      } else if (message.message) {
        transcriptText = message.message
        role = message.role || 'assistant'
      }
      
      if (transcriptText) {
        // Always add new messages to preserve full conversation history
        setMessages(prev => {
          // Check if this is an update to the last message (same role, recent timestamp)
          const lastMessage = prev[prev.length - 1]
          const isRecentUpdate = lastMessage && 
                                 lastMessage.role === role && 
                                 Date.now() - lastMessage.timestamp.getTime() < 2000
          
          if (isRecentUpdate && transcriptText.includes(lastMessage.text)) {
            // Update existing message if it's a continuation
            const updated = [...prev]
            updated[updated.length - 1] = {
              ...lastMessage,
              text: transcriptText, // Update with latest full text
              timestamp: new Date()
            }
            messagesRef.current = updated
            return updated
          } else {
            // Add new message to preserve all conversation
            const newMessage: Message = {
              id: `${Date.now()}-${Math.random()}`,
              role: role,
              text: transcriptText,
              timestamp: new Date(),
            }
            const updated = [...prev, newMessage]
            messagesRef.current = updated
            return updated
          }
        })
        
        if (role === 'user') {
          setTranscript(transcriptText)
        }
      }
    })

    vapi.on('error', (error: any) => {
      console.error('❌ Vapi error:', error)
      setStatus('idle')
    })

    return () => {
      if (vapiRef.current && isConnectedRef.current) {
        vapiRef.current.stop()
      }
    }
  }, [navigate])

  const extractInformationFromConversation = async (msgs: Message[]): Promise<Partial<ConversationData>> => {
    const fullText = msgs.map(m => `${m.role === 'user' ? 'Patient' : 'Jamie'}: ${m.text}`).join('\n')
    const userMessages = msgs.filter(m => m.role === 'user').map(m => m.text).join(' ')
    const assistantMessages = msgs.filter(m => m.role === 'assistant').map(m => m.text).join(' ')
    
    // Use LLM to extract information accurately
    const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyB_wmrEbTz9YJlMUvNDFaUwcoJCyf1AuVE'
    
    const extractionPrompt = `You are a medical information extraction assistant. Analyze this complete conversation between a healthcare AI assistant (Jamie) and a patient, and extract all relevant medical information.

FULL CONVERSATION:
${fullText}

Extract the following information and return ONLY a JSON object:
{
  "patientName": "extracted name or 'Patient' if not found",
  "patientAge": "age in years or null",
  "patientGender": "male/female/other or null",
  "chiefComplaint": "main reason for visit in one sentence",
  "symptoms": ["symptom 1", "symptom 2", ...],
  "allergies": ["allergy 1", "allergy 2", ...] or ["None"] if none mentioned,
  "medications": ["medication 1", "medication 2", ...] or ["None"] if none mentioned,
  "chronicConditions": ["condition 1", "condition 2", ...] or ["None"] if none mentioned
}

Be thorough and extract ALL mentioned symptoms, allergies, medications, and conditions. Return ONLY the JSON, nothing else.`
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: extractionPrompt }] }]
        })
      })
      
      const data = await response.json()
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const responseText = data.candidates[0].content.parts[0].text.trim()
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const extracted = JSON.parse(jsonMatch[0])
            console.log('✅ LLM extracted information:', extracted)
            
            // Use LLM extracted data
            const symptoms: string[] = Array.isArray(extracted.symptoms) ? extracted.symptoms.map((s: any) => String(s)) : []
            const allergies: string[] = Array.isArray(extracted.allergies) ? extracted.allergies.map((a: any) => String(a)) : ['None reported']
            const medications: string[] = Array.isArray(extracted.medications) ? extracted.medications.map((m: any) => String(m)) : ['None reported']
            const conditions: string[] = Array.isArray(extracted.chronicConditions) ? extracted.chronicConditions.map((c: any) => String(c)) : ['None reported']
            
            // Enhanced key findings with bullet points
            const keyFindings: string[] = []
            if (symptoms.length > 0) {
              keyFindings.push(`• Primary Symptoms: ${[...new Set(symptoms)].join(', ')}`)
            }
            if (allergies.length > 0 && allergies[0] !== 'None') {
              keyFindings.push(`• Allergies: ${[...new Set(allergies)].join(', ')}`)
            } else {
              keyFindings.push(`• Allergies: None reported`)
            }
            if (conditions.length > 0 && conditions[0] !== 'None') {
              keyFindings.push(`• Chronic Conditions: ${[...new Set(conditions)].join(', ')}`)
            } else {
              keyFindings.push(`• Chronic Conditions: None reported`)
            }
            if (medications.length > 0 && medications[0] !== 'None') {
              keyFindings.push(`• Current Medications: ${[...new Set(medications)].join(', ')}`)
            } else {
              keyFindings.push(`• Current Medications: None reported`)
            }
            if (keyFindings.length === 0) {
              keyFindings.push('• No specific findings reported')
            }
            
            // Enhanced recommendations
            const recommendations: string[] = []
            if (symptoms.length > 0) {
              recommendations.push(`• Follow-up consultation recommended based on symptoms`)
              recommendations.push(`• Monitor symptom progression`)
            } else {
              recommendations.push(`• Routine check-up recommended`)
            }
            if (medications.length > 0 && medications[0] !== 'None') {
              recommendations.push(`• Review current medications for interactions`)
            }
            recommendations.push(`• Continue monitoring patient condition`)
            
            return {
              patientName: extracted.patientName || 'Patient',
              patientAge: extracted.patientAge || undefined,
              patientGender: extracted.patientGender || undefined,
              chiefComplaint: extracted.chiefComplaint || 'General consultation',
              symptoms: symptoms.length > 0 ? [...new Set(symptoms)] : ['General consultation'],
              allergies: allergies[0] === 'None' ? ['None reported'] : [...new Set(allergies)],
              medications: medications[0] === 'None' ? ['None reported'] : [...new Set(medications)],
              chronicConditions: conditions[0] === 'None' ? ['None reported'] : [...new Set(conditions)],
              medicalHistory: fullText,
              aiAnalysis: assistantMessages.length > 0 
                ? assistantMessages.split('.').slice(0, 5).join('.') + '.'
                : `Based on conversation: ${symptoms.length > 0 ? 'Symptoms detected: ' + symptoms.join(', ') : 'General consultation'}`,
              keyFindings: keyFindings,
              recommendations: recommendations
            }
          }
        } catch (e) {
          console.error('Error parsing LLM extraction:', e)
        }
      }
    } catch (error) {
      console.error('Error extracting information with LLM:', error)
    }
    
    // Fallback to basic extraction if LLM fails
    const nameMatch = userMessages.match(/my name is ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i) || 
                      userMessages.match(/i'm ([A-Z][a-z]+)/i) ||
                      userMessages.match(/i am ([A-Z][a-z]+)/i) ||
                      userMessages.match(/name is ([A-Z][a-z]+)/i)
    const ageMatch = userMessages.match(/(\d+)\s*(?:years?|yrs?|old)/i)
    const genderMatch = userMessages.match(/\b(male|female|man|woman)\b/i)
    const firstUserMsg = msgs.find(m => m.role === 'user' && m.text.length > 10)
    const chiefComplaint = firstUserMsg?.text || userMessages.split('.')[0] || 'General consultation'
    
    return {
      patientName: nameMatch ? nameMatch[1] : 'Patient',
      patientAge: ageMatch ? ageMatch[1] : undefined,
      patientGender: genderMatch ? genderMatch[1] : undefined,
      chiefComplaint: chiefComplaint.length > 100 ? chiefComplaint.substring(0, 100) + '...' : chiefComplaint,
      symptoms: ['General consultation'],
      allergies: ['None reported'],
      medications: ['None reported'],
      chronicConditions: ['None reported'],
      medicalHistory: fullText,
      aiAnalysis: 'Analysis pending',
      keyFindings: ['• No specific findings reported'],
      recommendations: ['• Routine check-up recommended']
    }
  }

  const startCall = async () => {
    if (!vapiRef.current) return

    try {
      setStatus('connecting')
      await vapiRef.current.start(ASSISTANT_ID)
    } catch (error: any) {
      console.error('❌ Error starting call:', error)
      setStatus('idle')
      alert(`Error starting call: ${error.message || 'Unknown error'}`)
    }
  }

  const stopCall = async () => {
    if (!vapiRef.current || !isConnectedRef.current) return

    try {
      await vapiRef.current.stop()
      setStatus('idle')
      isConnectedRef.current = false
    } catch (error: any) {
      console.error('❌ Error stopping call:', error)
    }
  }

  return (
    <div className="voice-session-green">
      <div className="voice-container-green">
        {status === 'idle' && (
          <motion.div 
            className="start-screen-green"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="start-title-green">Talk to Jamie</h1>
            <p className="subtitle-green">Your AI healthcare assistant</p>
            
            <motion.button 
              className="cta-button-secondary voice-upload-button"
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="upload-icon-cluely">↑</span>
              Upload Medical History
            </motion.button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            {pdfFile && (
              <motion.div 
                className="file-selected-cluely"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>{pdfFile.name}</span>
                <button onClick={() => setPdfFile(null)}>×</button>
              </motion.div>
            )}
            
            <motion.button 
              className="start-button-green" 
              onClick={startCall}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(7, 133, 84, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Start Speaking
            </motion.button>
          </motion.div>
        )}

        {status !== 'idle' && (
          <>
            <motion.div 
              className="status-indicator-green"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="status-dot"></div>
              <span>
                {status === 'connected' && 'Connected'}
                {status === 'listening' && 'Listening...'}
                {status === 'speaking' && 'Jamie is speaking...'}
              </span>
            </motion.div>

            <div className="messages-area-green" ref={messagesContainerRef}>
              {messages.length === 0 && (
                <motion.div 
                  className="empty-state-green"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Conversation will appear here...
                </motion.div>
              )}
              {messages.map((message, index) => (
                <motion.div 
                  key={message.id} 
                  className={`message-wrapper-green ${message.role}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="speaker-label"
                    initial={{ opacity: 0, x: message.role === 'user' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    {message.role === 'user' ? 'You' : 'Jamie'}
                  </motion.div>
                  <motion.div 
                    className={`message-green ${message.role}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.15,
                      type: "spring",
                      stiffness: 400
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: message.role === 'user' 
                        ? "0 8px 24px rgba(7, 133, 84, 0.3)"
                        : "0 8px 24px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <motion.div 
                      className="message-text-green"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {message.text}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {transcript && status === 'listening' && (
              <motion.div 
                className="transcript-bar-green"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="transcript-label-text">You're saying:</span>
                <span className="transcript-text-content">{transcript}</span>
              </motion.div>
            )}

            <motion.button 
              className="stop-button-green" 
              onClick={stopCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              End Conversation
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}

function Report() {
  const navigate = useNavigate()
  const location = window.history.state
  const [data, setData] = useState<ConversationData | null>(null)

  useEffect(() => {
    // Get data from navigation state
    if (location?.usr) {
      setData(location.usr as ConversationData)
    } else {
      // Fallback if no data
      setData({
        messages: [],
        patientName: 'Patient',
        chiefComplaint: 'General consultation',
        symptoms: ['No specific symptoms'],
        allergies: ['None reported'],
        medicalHistory: 'No history provided',
        aiAnalysis: 'No analysis available',
        keyFindings: ['No findings'],
        recommendations: ['Follow-up recommended']
      })
    }
  }, [location])

  const downloadPDF = () => {
    // PDF generation will be implemented
    alert('PDF download feature coming soon')
  }

  if (!data) return <div className="loading">Loading report...</div>

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-header">
          <div className="header-content">
            <h1>{data.patientName || 'Patient'}</h1>
            <p>
              {data.patientAge && `Age: ${data.patientAge}`}
              {data.patientGender && ` • ${data.patientGender}`}
              {` • ${new Date().toLocaleDateString()}`}
            </p>
          </div>
          <div className="gradient-bar"></div>
        </div>

        <section className="report-section">
          <h2>Chief Complaint</h2>
          <p className="chief-complaint">{data.chiefComplaint || 'General consultation'}</p>
        </section>

        <section className="report-section">
          <h2>Symptoms Summary</h2>
          <ul className="symptoms-list">
            {data.symptoms?.map((symptom, i) => (
              <li key={i}>{symptom}</li>
            ))}
          </ul>
        </section>

        <section className="report-section">
          <h2>Allergies</h2>
          <div className={data.allergies?.some(a => a.toLowerCase() !== 'none reported') ? 'allergy-alert' : 'no-allergy'}>
            {data.allergies?.join(', ') || 'None reported'}
          </div>
        </section>

        <section className="report-section">
          <h2>Chronic Conditions</h2>
          <p>{data.chronicConditions?.join(', ') || 'None reported'}</p>
        </section>

        <section className="report-section">
          <h2>Current Medications</h2>
          <p>{data.medications?.join(', ') || 'None reported'}</p>
        </section>

        <section className="report-section">
          <h2>Medical History</h2>
          <p>{data.medicalHistory || 'No history provided'}</p>
        </section>

        <section className="report-section">
          <h2>AI Analysis</h2>
          <p>{data.aiAnalysis || 'Analysis pending'}</p>
        </section>

        <section className="report-section">
          <h2>Key Findings</h2>
          <ul className="findings-list">
            {data.keyFindings?.map((finding, i) => (
              <li key={i}>{finding}</li>
            ))}
          </ul>
        </section>

        <section className="report-section">
          <h2>Recommended Next Steps</h2>
          <ul className="recommendations-list">
            {data.recommendations?.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </section>

        <div className="report-footer">
          <p>Ready for doctor consultation</p>
          <div className="footer-actions">
            <button className="download-button" onClick={downloadPDF}>
              Download PDF
            </button>
            <button 
              className="dashboard-button" 
              onClick={() => navigate('/dashboard', { state: data })}
            >
              Send to Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DoctorDashboard() {
  const navigate = useNavigate()
  const location = window.history.state
  const [selectedPatient, setSelectedPatient] = useState<ConversationData | null>(null)
  const [patients, setPatients] = useState<ConversationData[]>([])
  const [consultationActive, setConsultationActive] = useState(false)
  const [doctorNotes, setDoctorNotes] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [showConsultationPopup, setShowConsultationPopup] = useState(false)
  const [consultationTranscript, setConsultationTranscript] = useState('')
  const [showSickLeaveApproval, setShowSickLeaveApproval] = useState(false)
  const [showInsuranceApproval, setShowInsuranceApproval] = useState(false)
  const [sickLeaveData, setSickLeaveData] = useState<any>(null)
  const [insuranceData, setInsuranceData] = useState<any>(null)
  const [sickLeaveApprovalText, setSickLeaveApprovalText] = useState('')
  const [insuranceApprovalText, setInsuranceApprovalText] = useState('')
  const [consultationMessages, setConsultationMessages] = useState<Array<{role: 'doctor' | 'patient', text: string, timestamp: Date}>>([])
  const [realTimeNotes, setRealTimeNotes] = useState<string[]>([])
  const [realTimeTranscript, setRealTimeTranscript] = useState<Array<{role: 'doctor' | 'patient', text: string, timestamp: Date, isPolished?: boolean}>>([])
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const groqClientRef = useRef<Groq | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Check if doctor is logged in
  useEffect(() => {
    if (!localStorage.getItem('doctorLoggedIn')) {
      navigate('/doctor-login')
      return
    }
  }, [navigate])

  useEffect(() => {
    if (location?.usr) {
      const newPatient = location.usr as ConversationData
      setPatients(prev => {
        // Check if patient already exists
        const exists = prev.find(p => p.patientName === newPatient.patientName)
        if (exists) {
          return prev.map(p => p.patientName === newPatient.patientName ? newPatient : p)
        }
        return [...prev, newPatient]
      })
      setSelectedPatient(newPatient)
    }
  }, [location])
  
  // Initialize with selected patient if available
  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0])
    }
  }, [patients])

  // Initialize Groq client
  useEffect(() => {
    const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || ''
    if (GROQ_API_KEY) {
      groqClientRef.current = new Groq({ apiKey: GROQ_API_KEY })
    }
  }, [])

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [realTimeTranscript])

  // Start/Stop real-time speech-to-text
  useEffect(() => {
    console.log('🔄 Consultation state changed:', { consultationActive, isListening })
    if (consultationActive && !isListening) {
      console.log('▶️ Starting listening...')
      const timer = setTimeout(() => {
        startListening()
      }, 500)
      return () => clearTimeout(timer)
    } else if (!consultationActive && isListening) {
      console.log('⏹️ Stopping listening...')
      stopListening()
    }

    return () => {
      if (isListening) {
        stopListening()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationActive])

  const startListening = async () => {
    try {
      console.log('🎤 Starting microphone...')
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      })
      console.log('✅ Microphone access granted')
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data && event.data.size > 0) {
          console.log('📦 Audio chunk received:', event.data.size, 'bytes')
          // Process chunk immediately
          const chunkBlob = event.data
          
          // Process this chunk immediately (non-blocking)
          processAudioChunkDirect(chunkBlob).catch(error => {
            console.error('❌ Error processing chunk:', error)
          })
        }
      }
      
      mediaRecorder.onstop = () => {
        console.log('⏹️ Recording stopped')
      }
      
      mediaRecorder.onerror = (event) => {
        console.error('❌ MediaRecorder error:', event)
      }
      
      // Start recording with timeslice to get chunks every 5 seconds
      mediaRecorder.start(5000)
      setIsListening(true)
      console.log('🎙️ Recording started, listening for speech...')
      
    } catch (error) {
      console.error('❌ Error starting microphone:', error)
      alert('Microphone access denied. Please allow microphone access to use real-time transcription.')
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
      recordingIntervalRef.current = null
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
    
    mediaRecorderRef.current = null
    audioChunksRef.current = []
    setIsListening(false)
  }

  const processAudioChunkDirect = async (audioBlob: Blob) => {
    console.log('📤 Processing audio chunk directly:', audioBlob.size, 'bytes')
    setIsProcessing(true)
    
    try {
      // Use Groq API directly via fetch
      const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || ''
      if (!GROQ_API_KEY) {
        console.warn('⚠️ Groq API key not found. Please add VITE_GROQ_API_KEY to .env file.')
        setIsProcessing(false)
        return
      }
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.webm')
      formData.append('model', 'whisper-large-v3-turbo')
      formData.append('temperature', '0')
      formData.append('response_format', 'verbose_json')
      
      console.log('🔄 Calling Groq API...')
      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: formData
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Groq API error:', response.status, errorText)
        setIsProcessing(false)
        throw new Error(`Groq API error: ${response.status} - ${errorText}`)
      }
      
      const transcription = await response.json()
      console.log('✅ Transcription received:', transcription.text)
      
      if (transcription.text && transcription.text.trim().length > 0) {
        // IMMEDIATELY display raw transcription in real-time
        const rawText = transcription.text.trim()
        setRealTimeTranscript(prev => [...prev, {
          role: 'doctor', // Default to doctor since it's the doctor's microphone
          text: rawText,
          timestamp: new Date(),
          isPolished: false
        }])
        
        // Also update consultation transcript
        setConsultationTranscript(prev => prev + '\n' + rawText)
        
        // Send to Gemini to polish notes AND identify speaker
        await polishAndAddNote(rawText)
      } else {
        console.log('⚠️ Empty transcription received')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('❌ Error transcribing audio:', error)
      setIsProcessing(false)
    }
  }

  const polishAndAddNote = async (rawText: string) => {
    console.log('✨ Polishing note and identifying speaker:', rawText.substring(0, 50) + '...')
    try {
      const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyB_wmrEbTz9YJlMUvNDFaUwcoJCyf1AuVE'
      
      const prompt = `You are a medical note-taking assistant. Analyze this raw transcription from a doctor-patient consultation.

Raw transcription: "${rawText}"

Determine:
1. Who is speaking? (doctor or patient) - Look for medical terminology, questions, or patient responses
2. Create a polished, professional medical note from this transcription

Respond in JSON format:
{
  "speaker": "doctor" or "patient",
  "polishedNote": "polished medical note here"
}

Return ONLY the JSON, nothing else.`
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })
      
      const data = await response.json()
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const responseText = data.candidates[0].content.parts[0].text.trim()
        console.log('✅ LLM response:', responseText.substring(0, 100) + '...')
        
        // Try to parse JSON response
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            const speaker = (parsed.speaker || 'doctor') as 'doctor' | 'patient'
            const polishedNote = parsed.polishedNote || rawText
            
            console.log('✅ Polished note (speaker:', speaker, '):', polishedNote.substring(0, 50) + '...')
            
            // Update transcript with polished version
            setRealTimeTranscript(prev => {
              const updated = [...prev]
              const lastIndex = updated.length - 1
              if (lastIndex >= 0 && !updated[lastIndex].isPolished) {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  role: speaker,
                  text: polishedNote,
                  isPolished: true
                }
              }
              return updated
            })
            
            // Add to notes
            setRealTimeNotes(prev => [...prev, polishedNote])
            setDoctorNotes(prev => [...prev, polishedNote])
            setIsProcessing(false)
          } else {
            throw new Error('No JSON found in response')
          }
        } catch (parseError) {
          // Fallback: use raw text
          console.log('⚠️ JSON parsing failed, using raw text')
          setRealTimeNotes(prev => [...prev, rawText])
          setDoctorNotes(prev => [...prev, rawText])
          setIsProcessing(false)
        }
      } else {
        // Fallback: use raw text if polishing fails
        console.log('⚠️ Polishing failed, using raw text')
        setRealTimeNotes(prev => [...prev, rawText])
        setDoctorNotes(prev => [...prev, rawText])
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('❌ Error polishing note:', error)
      // Fallback: use raw text
      setRealTimeNotes(prev => [...prev, rawText])
      setDoctorNotes(prev => [...prev, rawText])
      setIsProcessing(false)
    }
  }

  const handleStartConsultation = async () => {
    if (!selectedPatient) return
    
    console.log('🚀 Starting consultation...')
    
    // Request microphone permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('✅ Microphone permission granted')
    } catch (error) {
      console.error('❌ Microphone permission denied:', error)
      alert('Microphone access is required for real-time transcription. Please allow microphone access.')
      return
    }
    
    setConsultationActive(true)
    setShowConsultationPopup(true)
    setConsultationTranscript('')
    setDoctorNotes([])
    setConsultationMessages([])
    setRealTimeNotes([])
    setRealTimeTranscript([])
    
    // Update patient to show consultation active
    setPatients(prev => prev.map(p => 
      p.patientName === selectedPatient.patientName 
        ? { ...p, consultationActive: true }
        : p
    ))
    setSelectedPatient({ ...selectedPatient, consultationActive: true })
    
    console.log('✅ Consultation started, waiting for useEffect to trigger listening...')
  }
  
  const handleEndConsultation = async () => {
    // Stop listening first
    stopListening()
    
    setConsultationActive(false)
    setShowConsultationPopup(false)
    
    if (!selectedPatient) return
    
    // Generate AI Analysis from live consultation transcript
    const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyB_wmrEbTz9YJlMUvNDFaUwcoJCyf1AuVE'
    
    // Create full consultation transcript text
    const fullTranscript = realTimeTranscript.map(msg => 
      `${msg.role === 'doctor' ? 'Doctor' : 'Patient'}: ${msg.text}`
    ).join('\n\n')
    
    // Generate AI Analysis (possible diagnoses and recommended tests)
    try {
      const analysisPrompt = `You are a medical AI assistant. Analyze this complete doctor-patient consultation transcript and provide:

1. POSSIBLE DIAGNOSES: List 3-5 possible medical conditions/diagnoses based on the symptoms, complaints, and examination findings mentioned. Include confidence levels if possible.

2. RECOMMENDED TESTS: List specific medical tests, scans, or procedures that should be conducted to confirm or rule out the diagnoses.

CONSULTATION TRANSCRIPT:
${fullTranscript || consultationTranscript || 'No transcript available'}

PRE-SCREENING DATA:
${JSON.stringify({
  symptoms: selectedPatient.symptoms,
  allergies: selectedPatient.allergies,
  medications: selectedPatient.medications,
  chronicConditions: selectedPatient.chronicConditions,
  chiefComplaint: selectedPatient.chiefComplaint
}, null, 2)}

MEDICAL HISTORY:
${selectedPatient.pdfSummary || 'No medical history provided'}

Respond in JSON format:
{
  "possibleDiagnosis": ["diagnosis 1", "diagnosis 2", "diagnosis 3"],
  "recommendedTests": ["test 1", "test 2", "test 3"],
  "analysis": "Brief summary of findings and clinical reasoning"
}

Return ONLY the JSON, nothing else.`
      
      const analysisResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: analysisPrompt }] }]
        })
      })
      
      const analysisData = await analysisResponse.json()
      if (analysisData.candidates?.[0]?.content?.parts?.[0]?.text) {
        const analysisText = analysisData.candidates[0].content.parts[0].text.trim()
        try {
          const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const analysis = JSON.parse(jsonMatch[0])
            console.log('✅ AI Analysis generated:', analysis)
            
            // Update patient with new analysis
            const updatedPatient = {
              ...selectedPatient,
              possibleDiagnosis: analysis.possibleDiagnosis || selectedPatient.possibleDiagnosis || [],
              recommendedTests: analysis.recommendedTests || selectedPatient.recommendedTests || [],
              aiAnalysis: analysis.analysis || selectedPatient.aiAnalysis || '',
              consultationActive: false,
              doctorNotes: doctorNotes
            }
            
            setSelectedPatient(updatedPatient)
            setPatients(prev => prev.map(p => 
              p.patientName === selectedPatient.patientName 
                ? updatedPatient
                : p
            ))
          }
        } catch (e) {
          console.error('Error parsing AI analysis:', e)
        }
      }
    } catch (error) {
      console.error('Error generating AI analysis:', error)
    }
    
    // Auto-generate simple sick leave and insurance claim data
    const consultationDuration = realTimeTranscript.length > 0 ? Math.ceil(realTimeTranscript.length / 2) : 3
    const primarySymptom = selectedPatient.symptoms?.[0] || selectedPatient.chiefComplaint || 'General consultation'
    const primaryDiagnosis = selectedPatient.possibleDiagnosis?.[0] || primarySymptom
    
    // Simple sick leave data
    setSickLeaveData({
      patientName: selectedPatient.patientName || 'Patient',
      days: consultationDuration,
      reason: primaryDiagnosis,
      symptoms: selectedPatient.symptoms?.join(', ') || primarySymptom,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(Date.now() + consultationDuration * 24 * 60 * 60 * 1000).toLocaleDateString()
    })
    
    // Simple insurance claim data
    setInsuranceData({
      patientName: selectedPatient.patientName || 'Patient',
      diagnosis: primaryDiagnosis,
      treatment: 'Medical consultation and evaluation',
      cost: '$150 - $300',
      reason: selectedPatient.chiefComplaint || 'General consultation',
      date: new Date().toLocaleDateString()
    })
    
    // Update patient status
    const updatedPatient = {
      ...selectedPatient,
      consultationActive: false,
      doctorNotes: doctorNotes
    }
    setSelectedPatient(updatedPatient)
    setPatients(prev => prev.map(p => 
      p.patientName === selectedPatient.patientName 
        ? updatedPatient
        : p
    ))
    
    // Show sick leave modal first
    setTimeout(() => {
      setShowSickLeaveApproval(true)
    }, 500)
  }
  
  const handleAddNote = () => {
    if (currentNote.trim()) {
      const newNote = currentNote.trim()
      setDoctorNotes([...doctorNotes, newNote])
      setConsultationMessages([...consultationMessages, {
        role: 'doctor',
        text: newNote,
        timestamp: new Date()
      }])
      setCurrentNote('')
    }
  }
  
  const handleApproveSickLeave = () => {
    setShowSickLeaveApproval(false)
    // Automatically show insurance claim modal after sick leave
    setTimeout(() => {
      setShowInsuranceApproval(true)
    }, 300)
  }
  
  const handleApproveInsurance = () => {
    // Generate complete report with both sick leave and insurance claim
    const completeReport = `COMPLETE MEDICAL REPORT
    
PATIENT INFORMATION:
Patient: ${selectedPatient?.patientName || 'Patient'}
Age: ${selectedPatient?.patientAge || 'N/A'}
Gender: ${selectedPatient?.patientGender || 'N/A'}
Date: ${new Date().toLocaleString()}

SICK LEAVE CERTIFICATE:
Duration: ${sickLeaveData?.days || 3} days
Start Date: ${sickLeaveData?.startDate || new Date().toLocaleDateString()}
End Date: ${sickLeaveData?.endDate || new Date(Date.now() + (sickLeaveData?.days || 3) * 24 * 60 * 60 * 1000).toLocaleDateString()}
Reason: ${sickLeaveData?.reason || selectedPatient?.possibleDiagnosis?.[0] || selectedPatient?.chiefComplaint}
Symptoms: ${sickLeaveData?.symptoms || selectedPatient?.symptoms?.join(', ') || 'General consultation'}
Sick Leave Approval: ${sickLeaveApprovalText || 'Approved by doctor'}

INSURANCE CLAIM:
Diagnosis: ${insuranceData?.diagnosis || selectedPatient?.possibleDiagnosis?.[0] || 'General consultation'}
Treatment: ${insuranceData?.treatment || 'Medical consultation and evaluation'}
Estimated Cost: ${insuranceData?.cost || '$150 - $300'}
Reason: ${insuranceData?.reason || selectedPatient?.chiefComplaint || 'General consultation'}
Insurance Approval: ${insuranceApprovalText || 'Approved by doctor'}

CONSULTATION SUMMARY:
Chief Complaint: ${selectedPatient?.chiefComplaint || 'General consultation'}
Symptoms: ${selectedPatient?.symptoms?.join(', ') || 'None reported'}
Allergies: ${selectedPatient?.allergies?.join(', ') || 'None reported'}
Medications: ${selectedPatient?.medications?.join(', ') || 'None reported'}
Chronic Conditions: ${selectedPatient?.chronicConditions?.join(', ') || 'None reported'}

AI ANALYSIS:
${selectedPatient?.aiAnalysis || 'Analysis pending'}

POSSIBLE DIAGNOSIS:
${selectedPatient?.possibleDiagnosis?.map((d, i) => `${i + 1}. ${d}`).join('\n') || 'Pending'}

RECOMMENDED TESTS:
${selectedPatient?.recommendedTests?.map((t, i) => `${i + 1}. ${t}`).join('\n') || 'Pending'}

DOCTOR'S NOTES:
${doctorNotes.join('\n\n') || 'No additional notes'}

Generated: ${new Date().toLocaleString()}
`
    const emailSubject = encodeURIComponent(`Complete Medical Report: ${selectedPatient?.patientName || 'Patient'}`)
    const emailBody = encodeURIComponent(completeReport)
    window.location.href = `mailto:ssagala@wisc.edu?subject=${emailSubject}&body=${emailBody}`
    setShowInsuranceApproval(false)
    alert('Complete report (sick leave + insurance claim) sent to ssagala@wisc.edu')
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container-chat">
        {/* Patient List Sidebar */}
        <div className="patients-sidebar">
          <div className="patients-header">
            <h2>Patients</h2>
            <span className="patient-count">{patients.length}</span>
          </div>
          <div className="patients-list">
            {patients.length === 0 ? (
              <div className="no-patient-message">
                <p>No patients available. Waiting for patient reports...</p>
              </div>
            ) : (
              patients.map((patient) => (
              <motion.div
                key={patient.patientName || Math.random()}
                className={`patient-chat-item ${selectedPatient?.patientName === patient.patientName ? 'active' : ''}`}
                onClick={() => setSelectedPatient(patient)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                  <div className="patient-avatar">
                    {patient.patientName?.[0]?.toUpperCase() || 'P'}
                  </div>
                  <div className="patient-chat-info">
                    <div className="patient-chat-name">{patient.patientName || 'Patient'}</div>
                    <div className="patient-chat-preview">
                      {patient.chiefComplaint || 'General consultation'}
                    </div>
                  </div>
                  {patient.consultationActive && (
                    <div className="consultation-indicator"></div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        {selectedPatient ? (
          <div className="chat-main-area">
            {/* Chat Header */}
            <div className="chat-header">
              <button
                className={consultationActive ? 'end-consultation-button' : 'start-consultation-button'}
                onClick={consultationActive ? handleEndConsultation : handleStartConsultation}
                style={{ marginRight: 'auto', zIndex: 1000 }}
              >
                {consultationActive ? 'End Consultation' : 'Start Consultation'}
              </button>
              <div className="chat-header-info">
                <div className="chat-patient-avatar">
                  {selectedPatient.patientName?.[0]?.toUpperCase() || 'P'}
                </div>
                <div>
                  <h3>{selectedPatient.patientName || 'Patient'}</h3>
                  <p>
                    {selectedPatient.patientAge && `Age: ${selectedPatient.patientAge}`}
                    {selectedPatient.patientGender && ` • ${selectedPatient.patientGender}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="chat-messages-container">
              {/* Patient Info Card */}
              <div className="patient-info-card">
                <h4>Patient Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Chief Complaint:</span>
                    <span className="info-value">{selectedPatient.chiefComplaint || 'General consultation'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Allergies:</span>
                    <span className={`info-value ${selectedPatient.allergies?.some((a: string) => a.toLowerCase() !== 'none reported') ? 'allergy-highlight' : ''}`}>
                      {selectedPatient.allergies?.join(', ') || 'None reported'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Medications:</span>
                    <span className="info-value">{selectedPatient.medications?.join(', ') || 'None reported'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Chronic Conditions:</span>
                    <span className="info-value">{selectedPatient.chronicConditions?.join(', ') || 'None reported'}</span>
                  </div>
                </div>
              </div>

              {/* Medical History - PROMINENT SECTION */}
              <div className="medical-history-card prominent-section">
                <h4>📋 Medical History</h4>
                {selectedPatient.pdfSummary ? (
                  <div className="history-content-text">
                    {selectedPatient.pdfSummary}
                  </div>
                ) : (
                  <div className="history-placeholder">
                    No medical history uploaded. Patient can upload PDF during pre-screening.
                  </div>
                )}
                {selectedPatient.medicalHistory && (
                  <div className="conversation-history-box">
                    <h5>Pre-Screening Conversation Summary</h5>
                    <div className="history-content-text">
                      {selectedPatient.medicalHistory}
                    </div>
                  </div>
                )}
              </div>

              {/* Pre-Screening Conversation */}
              <div className="conversation-section">
                <h4>Pre-Screening Conversation</h4>
                {selectedPatient.messages?.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.role}`}>
                    <div className="message-sender">{msg.role === 'user' ? 'Patient' : 'Jamie'}</div>
                    <div className="message-content">{msg.text}</div>
                  </div>
                ))}
              </div>

              {/* Real-Time Consultation Transcript */}
              {consultationActive && (
                <div className="consultation-section real-time-transcript-section">
                  <h4>
                    🎤 Live Consultation Transcript
                    {isProcessing && <span className="processing-indicator">Processing...</span>}
                    {isListening && !isProcessing && <span className="listening-indicator">Listening...</span>}
                  </h4>
                  <div className="real-time-transcript-container">
                    {realTimeTranscript.length > 0 ? (
                      realTimeTranscript.map((msg, i) => (
                        <motion.div 
                          key={i} 
                          className={`chat-message ${msg.role} ${msg.isPolished ? 'polished' : 'raw'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="message-sender">
                            {msg.role === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'}
                            {!msg.isPolished && <span className="raw-indicator"> (transcribing...)</span>}
                          </div>
                          <div className="message-content">{msg.text}</div>
                          <div className="message-timestamp">
                            {msg.timestamp.toLocaleTimeString()}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="transcript-placeholder">
                        <p>🎤 Real-time transcription will appear here as you speak...</p>
                        <p className="transcript-hint">The system is listening and will transcribe both doctor and patient speech.</p>
                      </div>
                    )}
                    <div ref={transcriptEndRef} />
                  </div>
                </div>
              )}

              {/* Consultation Messages (Manual Notes) */}
              {consultationMessages.length > 0 && (
                <div className="consultation-section">
                  <h4>Consultation Notes</h4>
                  {consultationMessages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.role}`}>
                      <div className="message-sender">{msg.role === 'doctor' ? 'Doctor' : 'Patient'}</div>
                      <div className="message-content">{msg.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Analysis - Always show if consultation has ended or pre-screening data exists */}
              {((selectedPatient.possibleDiagnosis && selectedPatient.possibleDiagnosis.length > 0) || 
                (selectedPatient.recommendedTests && selectedPatient.recommendedTests.length > 0) ||
                selectedPatient.aiAnalysis) && (
                <div className="ai-analysis-card">
                  <h4>🤖 AI Analysis</h4>
                  
                  {selectedPatient.aiAnalysis && (
                    <div className="analysis-summary">
                      <strong>Clinical Analysis:</strong>
                      <p>{selectedPatient.aiAnalysis}</p>
                    </div>
                  )}
                  
                  {selectedPatient.possibleDiagnosis && selectedPatient.possibleDiagnosis.length > 0 && (
                    <div className="diagnosis-list">
                      <strong>Possible Diagnosis:</strong>
                      <ul>
                        {selectedPatient.possibleDiagnosis.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedPatient.recommendedTests && selectedPatient.recommendedTests.length > 0 && (
                    <div className="tests-list">
                      <strong>Recommended Tests:</strong>
                      <ul>
                        {selectedPatient.recommendedTests.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Note Input (during consultation) */}
            {consultationActive && (
              <div className="note-input-area">
                <input
                  type="text"
                  placeholder="Add consultation note..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  className="note-input"
                />
                <button onClick={handleAddNote} className="add-note-button">
                  Add Note
                </button>
              </div>
            )}

            {/* Action Buttons - Always visible when patient is selected */}
            {!consultationActive && (
              <div className="action-buttons-section">
                <motion.button
                  className="action-button"
                  onClick={() => {
                    const report = `MEDICAL REPORT\n\nPatient: ${selectedPatient.patientName}\nAge: ${selectedPatient.patientAge}\nGender: ${selectedPatient.patientGender}\n\nChief Complaint: ${selectedPatient.chiefComplaint}\nSymptoms: ${selectedPatient.symptoms?.join(', ')}\nAllergies: ${selectedPatient.allergies?.join(', ')}\nMedications: ${selectedPatient.medications?.join(', ')}\n\nAI Analysis: ${selectedPatient.aiAnalysis || 'N/A'}\nPossible Diagnosis: ${selectedPatient.possibleDiagnosis?.join(', ') || 'N/A'}\nRecommended Tests: ${selectedPatient.recommendedTests?.join(', ') || 'N/A'}\n\nGenerated: ${new Date().toLocaleString()}`
                    const blob = new Blob([report], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `Medical_Report_${selectedPatient.patientName}_${new Date().toISOString().split('T')[0]}.txt`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📥 Download Report
                </motion.button>
                <motion.button
                  className="action-button"
                  onClick={() => {
                    const tests = selectedPatient.recommendedTests?.join('\n') || 'No tests recommended yet'
                    alert(`Order Tests:\n\n${tests}\n\nTests will be ordered for ${selectedPatient.patientName}`)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🧪 Order Tests
                </motion.button>
                <motion.button
                  className="action-button"
                  onClick={() => {
                    const note = prompt('Enter a note for this patient:')
                    if (note) {
                      setDoctorNotes([...doctorNotes, note])
                      setConsultationMessages([...consultationMessages, {
                        role: 'doctor',
                        text: note,
                        timestamp: new Date()
                      }])
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📝 Add Notes
                </motion.button>
                <motion.button
                  className="action-button"
                  onClick={() => {
                    const email = `mailto:ssagala@wisc.edu?subject=Patient Report: ${selectedPatient.patientName}&body=Patient: ${selectedPatient.patientName}%0AChief Complaint: ${selectedPatient.chiefComplaint}%0A%0AView full report in dashboard.`
                    window.location.href = email
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 Send Report
                </motion.button>
              </div>
            )}

          </div>
        ) : (
          <div className="chat-main-area">
            <div className="chat-header">
              <h2>Doctor Dashboard</h2>
            </div>
            <div className="chat-messages-container">
              <div className="patient-info-card">
                <h4>Welcome to Vitals Dashboard</h4>
                <p>Select a patient from the sidebar to view their information and start a consultation.</p>
                <p>Features available:</p>
                <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                  <li>📋 Real-time consultation transcription</li>
                  <li>📝 Live notes taking</li>
                  <li>🏥 Sick leave certificate generation</li>
                  <li>💳 Insurance claim processing</li>
                  <li>🤖 AI analysis and diagnosis recommendations</li>
                  <li>📊 Medical history review</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-Time Notes Sidebar - Non-blocking */}
      {consultationActive && (
        <motion.div
          className="real-time-notes-sidebar"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="notes-sidebar-header">
            <div className="notes-status">
              <div className={`status-pulse ${isListening ? 'active' : ''}`}></div>
              <span>{isListening ? 'Listening...' : 'Processing...'}</span>
            </div>
            <button 
              className="minimize-notes"
              onClick={() => setShowConsultationPopup(!showConsultationPopup)}
            >
              {showConsultationPopup ? '−' : '+'}
            </button>
          </div>
          <div className="notes-sidebar-content">
            <div className="notes-label">Real-Time Notes</div>
            <div className="notes-list">
              {realTimeNotes.length > 0 ? (
                realTimeNotes.map((note, i) => (
                  <motion.div 
                    key={i} 
                    className="note-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {note}
                  </motion.div>
                ))
              ) : (
                <div className="notes-placeholder">
                  Notes will appear here as you speak...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Insurance Approval Modal */}
      {showInsuranceApproval && (
        <div className="approval-modal-overlay">
          <motion.div
            className="approval-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Approve Insurance Claim?</h2>
            <div className="approval-preview">
              <p><strong>Patient:</strong> {selectedPatient?.patientName || 'Patient'}</p>
              <p><strong>Date:</strong> {insuranceData?.date || new Date().toLocaleDateString()}</p>
              <p><strong>Diagnosis:</strong> {insuranceData?.diagnosis || selectedPatient?.possibleDiagnosis?.[0] || selectedPatient?.chiefComplaint}</p>
              <p><strong>Treatment:</strong> {insuranceData?.treatment || 'Medical consultation and evaluation'}</p>
              <p><strong>Estimated Cost:</strong> {insuranceData?.cost || '$150 - $300'}</p>
              <p><strong>Reason:</strong> {insuranceData?.reason || selectedPatient?.chiefComplaint || 'General consultation'}</p>
            </div>
            <div className="approval-textarea">
              <label>Reason for approval/denial (editable):</label>
              <textarea
                value={insuranceApprovalText}
                onChange={(e) => setInsuranceApprovalText(e.target.value)}
                placeholder="Enter reason for insurance claim..."
                rows={4}
              />
            </div>
            <div className="approval-actions">
              <button
                className="approve-button"
                onClick={handleApproveInsurance}
              >
                ✓ Approve
              </button>
              <button
                className="deny-button"
                onClick={() => {
                  setShowInsuranceApproval(false)
                  setTimeout(() => setShowSickLeaveApproval(true), 500)
                }}
              >
                ✗ Deny
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sick Leave Approval Modal */}
      {showSickLeaveApproval && (
        <div className="approval-modal-overlay">
          <motion.div
            className="approval-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Approve Sick Leave?</h2>
            <div className="approval-preview">
              <p><strong>Patient:</strong> {selectedPatient?.patientName || 'Patient'}</p>
              <p><strong>Duration:</strong> {sickLeaveData?.days || 3} days</p>
              <p><strong>Start Date:</strong> {sickLeaveData?.startDate || new Date().toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {sickLeaveData?.endDate || new Date(Date.now() + (sickLeaveData?.days || 3) * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <p><strong>Reason:</strong> {sickLeaveData?.reason || selectedPatient?.possibleDiagnosis?.[0] || selectedPatient?.chiefComplaint}</p>
              <p><strong>Symptoms:</strong> {sickLeaveData?.symptoms || selectedPatient?.symptoms?.join(', ') || 'General consultation'}</p>
            </div>
            <div className="approval-textarea">
              <label>Reason for approval/denial (editable):</label>
              <textarea
                value={sickLeaveApprovalText}
                onChange={(e) => setSickLeaveApprovalText(e.target.value)}
                placeholder="Enter reason for sick leave..."
                rows={4}
              />
            </div>
            <div className="approval-actions">
              <button
                className="approve-button"
                onClick={handleApproveSickLeave}
              >
                ✓ Approve
              </button>
              <button
                className="deny-button"
                onClick={() => setShowSickLeaveApproval(false)}
              >
                ✗ Deny
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function DoctorLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Fake authentication - accept any email/password
    setTimeout(() => {
      setLoading(false)
      // Store doctor info
      localStorage.setItem('doctorLoggedIn', 'true')
      localStorage.setItem('doctorEmail', email)
      navigate('/assign-patient')
    }, 1000)
  }

  return (
    <div className="doctor-login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <h1 className="login-logo">Vitals</h1>
          <p className="login-subtitle">Doctor Portal</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@vitals.com"
              required
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p className="login-hint">Demo: Any email/password will work</p>
      </motion.div>
    </div>
  )
}

function PatientAssignment() {
  const navigate = useNavigate()
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('')
  const [patientData, setPatientData] = useState<ConversationData | null>(null)

  const specialists = [
    { id: 'cardiology', name: 'Dr. Sarah Chen', specialty: 'Cardiology', available: true },
    { id: 'general', name: 'Dr. James Martinez', specialty: 'General Practice', available: true },
    { id: 'pulmonology', name: 'Dr. Amanda Rodriguez', specialty: 'Pulmonology', available: true },
    { id: 'neurology', name: 'Dr. Michael Park', specialty: 'Neurology', available: false },
    { id: 'orthopedics', name: 'Dr. Emily Watson', specialty: 'Orthopedics', available: true },
  ]

  useEffect(() => {
    // Check if doctor is logged in
    if (!localStorage.getItem('doctorLoggedIn')) {
      navigate('/doctor-login')
      return
    }

    // Get patient data from location state or localStorage
    const locationState = window.history.state
    if (locationState?.usr) {
      setPatientData(locationState.usr as ConversationData)
    }
  }, [navigate])

  const handleAssign = () => {
    if (!selectedSpecialist) {
      alert('Please select a specialist')
      return
    }

    const specialist = specialists.find(s => s.id === selectedSpecialist)
    if (!specialist) return

    // Store assignment
    if (patientData) {
      const assignedPatient = {
        ...patientData,
        assignedSpecialist: specialist.name,
        assignedSpecialty: specialist.specialty
      }
      localStorage.setItem('assignedPatient', JSON.stringify(assignedPatient))
      navigate('/dashboard', { state: assignedPatient })
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="assignment-page">
      <motion.div
        className="assignment-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="assignment-header">
          <h1>Assign Patient to Specialist</h1>
          <p>Select an available specialist for consultation</p>
        </div>

        {patientData && (
          <div className="patient-preview-card">
            <h3>Patient Information</h3>
            <p><strong>Name:</strong> {patientData.patientName || 'Patient'}</p>
            <p><strong>Chief Complaint:</strong> {patientData.chiefComplaint || 'General consultation'}</p>
            {patientData.symptoms && patientData.symptoms.length > 0 && (
              <p><strong>Symptoms:</strong> {patientData.symptoms.join(', ')}</p>
            )}
          </div>
        )}

        <div className="specialists-grid">
          {specialists.map((specialist) => (
            <motion.div
              key={specialist.id}
              className={`specialist-card ${selectedSpecialist === specialist.id ? 'selected' : ''} ${!specialist.available ? 'unavailable' : ''}`}
              onClick={() => specialist.available && setSelectedSpecialist(specialist.id)}
              whileHover={specialist.available ? { scale: 1.02, y: -2 } : {}}
              whileTap={specialist.available ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: specialists.indexOf(specialist) * 0.1 }}
            >
              <div className="specialist-avatar">
                {specialist.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3>{specialist.name}</h3>
              <p className="specialty">{specialist.specialty}</p>
              <div className={`availability ${specialist.available ? 'available' : 'unavailable'}`}>
                {specialist.available ? '✓ Available' : '✗ Unavailable'}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="assign-button"
          onClick={handleAssign}
          disabled={!selectedSpecialist}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Assign Patient
        </motion.button>

        <button
          className="skip-assignment"
          onClick={() => navigate('/dashboard')}
        >
          Skip Assignment
        </button>
      </motion.div>
    </div>
  )
}

function PostJamieScreen() {
  const navigate = useNavigate()
  const location = window.history.state
  const [patientData, setPatientData] = useState<ConversationData | null>(null)

  useEffect(() => {
    if (location?.usr) {
      setPatientData(location.usr as ConversationData)
    }
  }, [location])

  const handleContinue = () => {
    if (patientData) {
      // Check if doctor is logged in
      if (localStorage.getItem('doctorLoggedIn')) {
        navigate('/assign-patient', { state: patientData })
      } else {
        navigate('/doctor-login', { state: patientData })
      }
    } else {
      navigate('/doctor-login')
    }
  }

  return (
    <div className="post-jamie-page">
      <motion.div
        className="post-jamie-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          ✓
        </motion.div>

        <motion.h1
          className="post-jamie-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Pre-Screening Complete!
        </motion.h1>

        <motion.p
          className="post-jamie-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Your conversation with Jamie has been recorded and analyzed.
        </motion.p>

        {patientData && (
          <motion.div
            className="summary-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3>Summary</h3>
            <div className="summary-item">
              <strong>Patient:</strong> {patientData.patientName || 'Patient'}
            </div>
            {patientData.chiefComplaint && (
              <div className="summary-item">
                <strong>Chief Complaint:</strong> {patientData.chiefComplaint}
              </div>
            )}
            {patientData.symptoms && patientData.symptoms.length > 0 && (
              <div className="summary-item">
                <strong>Symptoms:</strong> {patientData.symptoms.slice(0, 3).join(', ')}
                {patientData.symptoms.length > 3 && ` +${patientData.symptoms.length - 3} more`}
              </div>
            )}
          </motion.div>
        )}

        <motion.button
          className="continue-button"
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(7, 133, 84, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Doctor Portal →
        </motion.button>
      </motion.div>
    </div>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #f0fdf4 0%, #dcfce7 50%, #ffffff 100%)'
    }}>
      <h1 style={{ fontSize: '72px', color: '#065f46', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '24px', color: '#047857', marginBottom: '32px' }}>Page Not Found</p>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 600,
          color: 'white',
          background: 'linear-gradient(135deg, #078554 0%, #13A56A 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/voice" element={<VoiceSession />} />
        <Route path="/post-jamie" element={<PostJamieScreen />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/assign-patient" element={<PatientAssignment />} />
        <Route path="/report" element={<Report />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

