const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-indigo-50 w-80 shadow-xl">
      <figure className="h-105 overflow-hidden">
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title font-bold text-lg">
          {firstName + " " + lastName}
        </h2>

        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}

        <p className="text-sm line-clamp-2">{about}</p>

        <div className="card-actions justify-center mt-3">
          <button className="btn btn-primary btn-sm">Ignore</button>
          <button className="btn btn-secondary btn-sm">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
