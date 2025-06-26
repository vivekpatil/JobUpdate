import { useState } from 'react'
import axios from 'axios'
import './App.css'
import ExcelUploader from './components/ExcelUploader'
import DataTable from './components/DataTable'
import ApiResponse from './components/ApiResponse'
import UploadButton from './components/UploadButton'

function App() {
  const [excelData, setExcelData] = useState([])
  const [apiResponse, setApiResponse] = useState(null)

  const postData = async () => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', excelData)
      setApiResponse(res.data)
    } catch (err) {
      setApiResponse('Error posting data')
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-heading">AMSS Batch Job Upload</h1>
      <ExcelUploader onData={setExcelData} />
      {excelData.length > 0 && (
        <>
          <DataTable data={excelData} />
          <UploadButton onClick={postData} />
        </>
      )}
      <ApiResponse response={apiResponse} />
    </div>
  )
}

export default App
