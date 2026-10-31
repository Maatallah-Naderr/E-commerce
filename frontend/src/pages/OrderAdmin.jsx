import { useState, useEffect } from "react";
import { getAllOrders, updateOrder } from "../api/orderService";
import styles from "./cssModule/orderAdmin.module.css"

export  default function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      setMessage("");
      console.log("is in handle update");
      const response = await updateOrder(id, status);
      console.log("update success in backend");
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? response.order : order)),
      );
      setMessage("status update with success");
    } catch (error) {
      console.log("error is ", error);
      setMessage(error.response?.data?.message || "error when updating status");
    }
  };

  return (
    <main className={styles.container} >
      <h1 className="styles.title"> All Orders</h1>
      {loading && <p> please wait is loading ...</p>}
      {message && <p> {message} </p>}
      <h3>Total orders is :{orders.length}</h3>
      {
        <table className={styles.table} >
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
                      <p>{item.product?.name || "product not uvaible"}</p>
                      <p>{item.quantity}</p>
                      {}
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                    <option value="paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </main>
  );
}
