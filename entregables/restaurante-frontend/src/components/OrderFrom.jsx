// PASO 1 — La función reemplaza a la clase
// CLASE:     class OrderForm extends React.Component {
// FUNCIONAL:
function OrderForm({ mesaNumero }) {
 
// PASO 2 — El constructor y this.state se convierten en useState
// CLASE:     this.state = { mesa: "", plato: "", cantidad: 1, enviando: false, mensaje: "" }
// FUNCIONAL: (un useState por cada campo de estado independiente)
  const [plato,    setPlato]    = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [mensaje,  setMensaje]  = useState("");
 
// PASO 3 — Los handlers pierden el this y el .bind()
// CLASE:     this.handleChange = this.handleChange.bind(this)
// FUNCIONAL: no hay bind — las funciones son closures que acceden al estado
  const handleChange = (event) => {
    const { name, value } = event.target;
    // ¿Cómo traducen el [name]: value del this.setState?
    // Pista: cada campo tiene su propio setter ahora
    if (name === "plato")    setPlato(value);
    if (name === "cantidad") setCantidad(value);
  };
 
// PASO 4 — componentDidMount se convierte en useEffect con []
// CLASE:     componentDidMount() { console.log(...) }
// FUNCIONAL:
  useEffect(() => {
    console.log("OrderForm montado — mesa:", mesaNumero);
  }, []); // [] = solo al montar
 
// PASO 5 — handleSubmit sin this
  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviando(true);
    setMensaje("");
    setTimeout(() => {
      setEnviando(false);
      setMensaje(`Comanda enviada: ${plato} x${cantidad}`);
      setPlato("");
      setCantidad(1);
    }, 1500);
  };
 
// PASO 6 — render() desaparece, el return va directo
// CLASE:     render() { return (...) }
// FUNCIONAL:
  return (
    // El JSX es idéntico — solo cambia this.props por mesaNumero
    // y this.state.plato por plato, this.state.enviando por enviando, etc.
    <form onSubmit={handleSubmit}>
      {/* ... mismo JSX que la clase, sin ningún this */}
    </form>
  );
}
 
export default OrderForm;
