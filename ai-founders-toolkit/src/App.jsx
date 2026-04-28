import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'ai-founders-toolkit-records'

function App() {
  const [problem, setProblem] = useState('');
  const [stakeholder1, setStakeholder1] = useState({
    resonate: '',
    aspects: '',
    questions: '',
    missing: ''
  });
  const [stakeholder2, setStakeholder2] = useState({
    resonate: '',
    aspects: '',
    questions: '',
    missing: ''
  });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedRecords = localStorage.getItem(STORAGE_KEY)
    if (storedRecords) {
      try {
        setRecords(JSON.parse(storedRecords))
      } catch (error) {
        console.error('Failed to parse saved records:', error)
      }
    }
  }, [])

  const saveRecords = (newRecords) => {
    setRecords(newRecords)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords))
  }

  const handleSave = () => {
    const newRecord = {
      id: Date.now(),
      problem,
      stakeholder1: { ...stakeholder1 },
      stakeholder2: { ...stakeholder2 }
    }

    saveRecords([newRecord, ...records])
  }

  const handleStakeholder1Change = (field, value) => {
    setStakeholder1(prev => ({ ...prev, [field]: value }));
  };

  const handleStakeholder2Change = (field, value) => {
    setStakeholder2(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app">
      <h1>AI Founders Toolkit</h1>
      <h2>Start to collect feedback on my problem.</h2>

      <div className="form-section">
        <div className="form-group">
          <label htmlFor="problem">Describe your business problem:</label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter the problem you want to tackle..."
          />
        </div>
      </div>

      <div className="stakeholder-section">
        <h3>Stakeholder 1</h3>
        <div className="form-group">
          <label>Does this problem resonate with them?</label>
          <textarea
            value={stakeholder1.resonate}
            onChange={(e) => handleStakeholder1Change('resonate', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What aspects do they think matter most?</label>
          <textarea
            value={stakeholder1.aspects}
            onChange={(e) => handleStakeholder1Change('aspects', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What questions or concerns come to mind?</label>
          <textarea
            value={stakeholder1.questions}
            onChange={(e) => handleStakeholder1Change('questions', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What are you missing about this problem?</label>
          <textarea
            value={stakeholder1.missing}
            onChange={(e) => handleStakeholder1Change('missing', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
      </div>

      <div className="stakeholder-section">
        <h3>Stakeholder 2</h3>
        <div className="form-group">
          <label>Does this problem resonate with them?</label>
          <textarea
            value={stakeholder2.resonate}
            onChange={(e) => handleStakeholder2Change('resonate', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What aspects do they think matter most?</label>
          <textarea
            value={stakeholder2.aspects}
            onChange={(e) => handleStakeholder2Change('aspects', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What questions or concerns come to mind?</label>
          <textarea
            value={stakeholder2.questions}
            onChange={(e) => handleStakeholder2Change('questions', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="form-group">
          <label>What are you missing about this problem?</label>
          <textarea
            value={stakeholder2.missing}
            onChange={(e) => handleStakeholder2Change('missing', e.target.value)}
            placeholder="Enter feedback..."
          />
        </div>
      </div>

      <button type="button" className="save-button" onClick={handleSave}>Save Problem and Feedback</button>

      {records.length > 0 && (
        <div className="records-section">
          <h3>Saved Records</h3>
          {records.map((record, index) => (
            <div key={record.id} className="record-card">
              <div className="record-header">Record {records.length - index}</div>
              <div className="output-item">
                <strong>Problem:</strong> {record.problem}
              </div>
              <div className="output-item">
                <strong>Stakeholder 1 - Resonates:</strong> {record.stakeholder1.resonate}
              </div>
              <div className="output-item">
                <strong>Stakeholder 1 - Aspects:</strong> {record.stakeholder1.aspects}</div>
              <div className="output-item">
                <strong>Stakeholder 1 - Questions/Concerns:</strong> {record.stakeholder1.questions}</div>
              <div className="output-item">
                <strong>Stakeholder 1 - Missing:</strong> {record.stakeholder1.missing}</div>
              <div className="output-item">
                <strong>Stakeholder 2 - Resonates:</strong> {record.stakeholder2.resonate}</div>
              <div className="output-item">
                <strong>Stakeholder 2 - Aspects:</strong> {record.stakeholder2.aspects}</div>
              <div className="output-item">
                <strong>Stakeholder 2 - Questions/Concerns:</strong> {record.stakeholder2.questions}</div>
              <div className="output-item">
                <strong>Stakeholder 2 - Missing:</strong> {record.stakeholder2.missing}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
