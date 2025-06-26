function DataTable({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'data-table-row-even' : 'data-table-row-odd'}>
              {Object.keys(data[0]).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable; 