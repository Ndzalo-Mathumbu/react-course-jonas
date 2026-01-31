import { useState } from "react";

const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: "Ndzalo NK",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: crypto.randomUUID(),
    name: "James Don",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Silver Man",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friendsArray, setFriendsArray] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleAddFriendToArray = function (recentFriend) {
    setFriendsArray((friend) => [...friend, recentFriend]);
  };
  /* const handleOpenSplitTab = function () {
    setSelectedFriend((a) => !a);
  }; */
  const handleSelection = function (friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((current) =>
      current?.id === friend?.id ? null : friend
    );
  };
  const handleSplit = function (value) {
    console.log(value);
    setFriendsArray((a) =>
      a.map((z) =>
        z?.id === selectedFriend?.id ? { ...z, balance: z.balance + value } : z
      )
    );
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendsArray={friendsArray}
          onAddFriend={handleAddFriendToArray}
          selectedFriend={selectedFriend}
          onSelction={handleSelection}
        />
      </div>
      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplit}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

const FriendList = function ({
  friendsArray,
  onAddFriend,
  onSelction,
  selectedFriend,
}) {
  const [renderForm, setRenderForm] = useState(!true);
  return (
    <>
      <ul>
        {friendsArray.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelction={onSelction}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
      {renderForm && <AddFriend onAddFriend={onAddFriend} />}
      <Button onClick={() => setRenderForm((a) => !a)}>
        {(renderForm && "close") || "Add Friend"}
      </Button>
    </>
  );
};

const Friend = function ({ friend, onSelction, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li className={isSelected ? `selected` : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} R{Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes me R{Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && (
          <p>
            Even {friend.name} R{Math.abs(friend.balance)}
          </p>
        )}
        <Button onClick={() => onSelction(friend)}>
          {isSelected ? `Close` : `Select`}
        </Button>
      </li>
    </>
  );
};

const AddFriend = function ({ onAddFriend }) {
  const [getFriendName, setGetFriendName] = useState("John Doe");
  const [getFriendImg, setGetFriendImg] = useState("https://i.pravatar.cc/50");

  const handleSubmit = function (e) {
    e.preventDefault();
    // const addFriendToArray = initialFriends;
    if (!getFriendName || !getFriendImg) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name: getFriendName,
      image: `${getFriendImg}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setGetFriendName("John Doe");
    setGetFriendImg("https://i.pravatar.cc/48");
  };

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👯‍♂️Friend Name</label>
        <input
          type="text"
          value={getFriendName}
          onChange={(e) => setGetFriendName(e.target.value)}
          placeholder="Enter your friend's name"
        />
        <label>🖼Img (URL)</label>
        <input
          type="text"
          value={getFriendImg}
          onChange={(e) => setGetFriendImg(e.target.value)}
          placeholder="Img (URL)"
        />
        <Button>Add</Button>
      </form>
    </>
  );
};

const Button = function ({ children, onClick }) {
  return (
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};
//
const SplitBill = function ({
  selectedFriend,
  onSplitBill,
  setSelectedFriend,
}) {
  const [getBillValue, setGetBillValue] = useState();
  const [getExpense, setGetExpense] = useState();
  const paidByFriend = getBillValue ? getBillValue - getExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!getBillValue || !getExpense) return;

    const friendShare = getBillValue - getExpense;
    const valueToUpdate = whoIsPaying === "user" ? friendShare : -getExpense;

    onSplitBill(valueToUpdate);

    setGetBillValue("");
    setGetExpense("");
    setWhoIsPaying("user");
    setSelectedFriend(null);
  };
  //
  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split the bill with {selectedFriend.name}</h2>
        <label>💵Bill Value</label>
        <input
          type="number"
          value={getBillValue}
          onChange={(e) => setGetBillValue(+e.target.value)}
          placeholder="Bill amount"
        />
        <label>🧑‍💼Your Expense</label>
        <input
          type="number"
          value={getExpense}
          onChange={(e) =>
            setGetExpense(+e.target.value) > getBillValue
              ? getExpense
              : +e.target.value
          }
          placeholder="Your share"
        />
        <label>👯‍♂️{selectedFriend.name}'s Expense</label>
        <input
          type="text"
          // value="your friend"
          disabled
          value={paidByFriend}
        />
        <label>💵 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split Bill</Button>
      </form>
    </>
  );
};

// const FriendList = function () {};

export default App;
