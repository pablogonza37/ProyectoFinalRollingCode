

const ItemVenta = ({venta}) => {
  return (
    <tr>
      <td>{venta.usuario}</td>
      <td>{venta.fecha}</td>
      <td>{venta.nombreProducto}</td>
      <td>{venta.cantidad}</td>
      <td>${venta.precioTotal}</td>
    </tr>
  );
};

export default ItemVenta;
