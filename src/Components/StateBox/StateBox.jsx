import "./StateBox.css";

const StateBox = ({ title, value, subtile }) => {
  return (
    <>
      <div className="card-container">
        <div className="d-flex flex-column ">
          <span className="label">{title}</span>
          <span className="subtile">{subtile}</span>
        </div>
        <span className="value">{value}</span>
      </div>
    </>
  );
};

export default StateBox;
