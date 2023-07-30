const scalaLabels = ['Grauenhaft', 'Schlecht', 'Angemessen', 'Gut', 'Hervorragend'];

export const ScalaLabels = () => {
  return (
    <>
      {scalaLabels.map((item) => {
        return (
          <span className='rotate-90 h-12 w-14 flex flex-col items-center text-xs justify-center' key={item.toString()}>
            <span>{item}</span>
          </span>
        );
      })}
    </>
  );
};
