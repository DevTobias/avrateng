import styles from './HorizontalLines.module.scss';

const scalaValues = [0, 20, 40, 60, 80, 100];

export const HorizontalLines = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={`line-${i}`} className={`w-[2px] bg-[#2b3139] h-full ${styles.line}`} aria-valuenow={scalaValues[i]} />
      ))}
    </>
  );
};
