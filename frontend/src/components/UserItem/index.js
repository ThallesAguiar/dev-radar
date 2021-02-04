import './styles.css';

function UserItem(props) {
  const { user } = props;

  return (
    <li className="user-item">
      <header>
        <img src={user.avatar_url} alt={user.name} />
        <div className="user-info">
          <strong>{user.name}</strong>
          {/* <span>{user.passions.join(', ')}</span> */}
        </div>
      </header>
      <p>{user.bio}</p>
      <a href={`https://github.com/${user.github_username}`} target="_blank">Acessar perfil github</a>
    </li>
  );
}

export default UserItem;