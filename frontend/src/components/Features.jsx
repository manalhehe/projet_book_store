const Features = () => {
  const items = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
    { icon: "🛡️", title: "Secure Payment", desc: "100% protected" },
    { icon: "🔄", title: "Easy Returns", desc: "30-day money back" }
  ];
//tableau (array) -> liste ordonnée qui contient plusieurs éléments.
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      padding: '60px 5%', 
      background: '#fff',
      textAlign: 'center' 
    }}>
      {/* // Pour chaque élément du tableau */}
      {items.map((item, i) => (
        <div key={i}> {/*identifier chaque élément*/}
          <div style={{ fontSize: '3rem' }}>{item.icon}</div>
          <h3 style={{ margin: '10px 0' }}>{item.title}</h3>
          <p style={{ color: '#666' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;