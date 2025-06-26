function ApiResponse({ response }) {
  if (!response) return null;
  return (
    <div className="api-response">
      <h3>API Response:</h3>
      <pre className="api-response-pre">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}

export default ApiResponse; 