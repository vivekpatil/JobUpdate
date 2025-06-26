import { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
// import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import './App.css'

function ExcelUploader({ onData }) {
  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json(worksheet)
    onData(json)
  }
  return <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
}

// function AuthButtons() {
//   const { instance } = useMsal()
//   const isAuthenticated = useIsAuthenticated()
//   return isAuthenticated ? (
//     <button onClick={() => instance.logoutRedirect()}>Logout</button>
//   ) : (
//     <button onClick={() => instance.loginRedirect()}>Login with Entra</button>
//   )
// }

function App() {
  const [excelData, setExcelData] = useState([])
  const [apiResponse, setApiResponse] = useState(null)
  // const isAuthenticated = useIsAuthenticated()

  const postData = async () => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', excelData)
      setApiResponse(res.data)
    } catch (err) {
      setApiResponse('Error posting data')
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f4f6fb', minHeight: '100vh' }}>
      <h1 style={{ color: '#2d3a4b', fontWeight: 700, fontSize: '2.2rem', marginBottom: 32 }}>AMSS Batch Job Upload</h1>
      {/* <AuthButtons /> */}
      {/* {isAuthenticated && ( */}
        <>
          <ExcelUploader onData={setExcelData} />
          {excelData.length > 0 && (
            <>
              <div style={{ maxHeight: 400, overflow: 'auto', background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(44,62,80,0.08)', margin: '24px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((key) => (
                        <th key={key} style={{ border: '1px solid #e0e6ed', padding: '10px 8px', background: '#eaf0fa', color: '#2d3a4b', fontWeight: 600 }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#f9fbfd' : '#fff' }}>
                        {Object.keys(excelData[0]).map((key) => (
                          <td key={key} style={{ border: '1px solid #e0e6ed', padding: '8px', color: '#2d3a4b' }}>{row[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={postData}
                style={{
                  background: 'linear-gradient(90deg, #4f8cff 0%, #3358e6 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 28px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
                  marginTop: 12,
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#3358e6'}
                onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #4f8cff 0%, #3358e6 100%)'}
              >
                Post Data to Dummy API
              </button>
            </>
          )}
          {apiResponse && (
            <div>
              <h3>API Response:</h3>
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          )}
        </>
      {/* )} */}
    </div>
  )
}

export default App
