// Medical Protocol Database
export interface MedicalProtocol {
  symptom: string
  condition: string
  recommendedTests: string[]
  urgency: 'low' | 'medium' | 'high'
}

export const medicalProtocols: MedicalProtocol[] = [
  {
    symptom: 'chest pain',
    condition: 'Possible cardiac event',
    recommendedTests: ['ECG', 'Troponin levels', 'Chest X-ray', 'Echocardiogram', 'Stress test'],
    urgency: 'high'
  },
  {
    symptom: 'shortness of breath',
    condition: 'Respiratory or cardiac issue',
    recommendedTests: ['Chest X-ray', 'Pulmonary function test', 'ECG', 'Blood gas analysis', 'D-dimer'],
    urgency: 'high'
  },
  {
    symptom: 'congestion',
    condition: 'Upper respiratory infection',
    recommendedTests: ['Physical examination', 'Nasal swab', 'CBC'],
    urgency: 'low'
  },
  {
    symptom: 'fever',
    condition: 'Infection',
    recommendedTests: ['CBC', 'Blood culture', 'Urine analysis', 'Chest X-ray'],
    urgency: 'medium'
  },
  {
    symptom: 'headache',
    condition: 'Various causes',
    recommendedTests: ['Neurological exam', 'CT scan (if severe)', 'Blood pressure check'],
    urgency: 'medium'
  },
  {
    symptom: 'abdominal pain',
    condition: 'Gastrointestinal issue',
    recommendedTests: ['Abdominal ultrasound', 'CBC', 'Liver function tests', 'Amylase/Lipase'],
    urgency: 'medium'
  }
]

export function getRecommendedTests(symptoms: string[]): string[] {
  const testSet = new Set<string>()
  
  symptoms.forEach(symptom => {
    const protocol = medicalProtocols.find(p => 
      symptom.toLowerCase().includes(p.symptom) || p.symptom.includes(symptom.toLowerCase())
    )
    if (protocol) {
      protocol.recommendedTests.forEach(test => testSet.add(test))
    }
  })
  
  return Array.from(testSet)
}

export function getPossibleDiagnosis(symptoms: string[]): string[] {
  const diagnosisSet = new Set<string>()
  
  symptoms.forEach(symptom => {
    const protocol = medicalProtocols.find(p => 
      symptom.toLowerCase().includes(p.symptom) || p.symptom.includes(symptom.toLowerCase())
    )
    if (protocol) {
      diagnosisSet.add(protocol.condition)
    }
  })
  
  // Add common diagnoses based on symptoms
  if (symptoms.some(s => s.toLowerCase().includes('cold') || s.toLowerCase().includes('congestion'))) {
    diagnosisSet.add('Upper respiratory tract infection')
    diagnosisSet.add('Common cold')
  }
  
  if (symptoms.some(s => s.toLowerCase().includes('cough'))) {
    diagnosisSet.add('Bronchitis')
    diagnosisSet.add('Pneumonia (if severe)')
  }
  
  return Array.from(diagnosisSet)
}

