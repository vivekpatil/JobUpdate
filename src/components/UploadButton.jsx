function UploadButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="upload-btn"
    >
      Post Data to Dummy API
    </button>
  );
}

export default UploadButton; 