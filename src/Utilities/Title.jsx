const Title = ({ normal, color }) => {
  return (
    <h2 className="text-2xl lg:text-4xl font-bold">
      {normal}
      <span className="text-primary ml-2">{color}</span>
    </h2>
  );
};

export default Title;
