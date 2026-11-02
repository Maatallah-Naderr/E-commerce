import { useState, useEffect } from "react";
import { getAllOrders, updateOrder } from "../api/orderService";
import styles from "./cssModule/orderAdmin.module.css";
import BadgeStatus from "../components/BadgeStatus";
export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  // const [updating , setUpdating]=useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await getAllOrders();
      console.log("response is ", response);
      setOrders(response);
    } catch (error) {
      console.log("error", error);

      setMessage(error.response?.data?.message || "error when loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      setUpdatingOrderId(id);
      setMessage("");
      setMessageType("");
      console.log("is in handle update");
      const response = await updateOrder(id, status);
      console.log("update success in backend");
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? response.order : order)),
      );
      setMessage("status update with success");
      setMessageType("success");
    } catch (error) {
      console.log("error is ", error);
      setMessage(error.response?.data?.message || "error when updating status");
      setMessageType("error");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message, messageType]);
  return (
    <main className={styles.container}>
      <h1 className="styles.title"> All Orders</h1>
      {loading && <p> please wait is loading ...</p>}
      {message && (
        <p className={`${styles.message} ${styles[messageType]}`}>
          {" "}
          {message}{" "}
        </p>
      )}
      <h3>Total orders is :{orders.length}</h3>
      {
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Client</th>
              <th>Product</th>
              <th>Total Price</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name} </td>
                <td>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      <p>{item.product?.name || "product not unvaible"}</p>
                      <p>{item.quantity}</p>
                      {}
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  <div className={styles.statusWrapper}>
                    <BadgeStatus status={order.status} />
                    <select
                      className={styles.statusSelect}
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                      disabled={updatingOrderId === order._id}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="shipped">Shipped</option>
                      <option value="paid">Paid</option>
                    </select>
                    {updatingOrderId === order._id && (
                      <small className={styles.update}>updating...</small>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </main>
  );
}
