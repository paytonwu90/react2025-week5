export default function Spinner({ className = "", small = false }) {
  return (
    <div className={`spinner-border ${className} ${small ? 'spinner-border-sm' : ''}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}