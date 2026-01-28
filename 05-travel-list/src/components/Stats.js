const Stats = function ({ numItems }) {
  if (!numItems.length)
    return <p className="stats">Add Somthing To Your Vacation List 🧳 🏝</p>;
  const numOfItemInArray = numItems.length;
  return (
    <>
      <footer className="stats">
        <em>
          You have {numOfItemInArray} items on your list, sure you packed enough
          🤔?
        </em>
      </footer>
    </>
  );
};
export default Stats;
