

export default function BadgeStatus({status}) {
    const statusStyles = {
        paid : "paid",
        pending:"pending",
        shipped:"shipped",
        delivered:"delivered"
    }
    const className =statusStyles[status]|| "unknown";
  return (
    <div>
      <span className={`status-badge  ${className}` }    > {status}</span>
    </div>
  )
}

