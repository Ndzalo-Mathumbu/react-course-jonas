const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
      </div>
      <SplitBill />
    </div>
  );
}

const FriendList = function () {
  const friends = initialFriends;
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
      <AddFriend />
      <Button>Add Friend</Button>
    </>
  );
};

const Friend = function ({ friend }) {
  return (
    <>
      <li>
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
        <Button>Select</Button>
      </li>
    </>
  );
};

const AddFriend = function () {
  return (
    <>
      <form className="form-add-friend">
        <label>👯‍♂️Friend Name</label>
        <input
          type="text"
          // value="your friend"
          // placeholder="Enter your friend's name"
        />
        <label>🖼Img (URL)</label>
        <input
          type="text"
          // value="your friend"
          // placeholder="Enter your friend's name"
        />
        <Button>Add</Button>
      </form>
    </>
  );
};

const Button = function ({ children }) {
  return (
    <>
      <button className="button">{children}</button>
    </>
  );
};

const SplitBill = function () {
  return (
    <>
      <form className="form-split-bill">
        <h2>Split the bill with X</h2>
        <label>💵Bill Value</label>
        <input
          type="text"
          // value="your friend"
          // placeholder="Enter your friend's name"
        />
        <label>🧑‍💼Your Expense</label>
        <input
          type="text"
          // value="your friend"
          // placeholder="Enter your friend's name"
        />
        <label>👯‍♂️X's Expense</label>
        <input
          type="text"
          // value="your friend"
          disabled
        />
        <label>💵 Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>
        <Button>Split Bill</Button>
      </form>
    </>
  );
};

// const FriendList = function () {};

export default App;
