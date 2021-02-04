import { useEffect, useState } from 'react';

function UserForm(props) {
  // data()=>{
  const [github_username, setGithubUsername] = useState('');
  // const [passions, setPassions] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  //}

  //watch(){
  useEffect(() => {
    // acho que ele é parecido com o Watch do Vue. Onde ele fica cuidando quando o valor vai mudar para ser acionado.
    //[] é onde vai a varivel que vai ser munitorada para ocorrer a ação do useEffect. Se estiver vazio, será executada uma vez só.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);
  //}

  //methods(){
  async function handleSubmit(e) {
    e.preventDefault(); //evita o recarregamento da pagina. Pois o form recarrega a pagina.

    await props.onSubmit({
      github_username,
      // passions,
      latitude,
      longitude
    });

    setGithubUsername('');
    setPassions('');
  }
  //}

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuario do github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>

      {/* <div className="input-block">
        <label htmlFor="passions">Suas paixões</label>
        <input
          name="passions"
          id="passions"
          required
          value={passions}
          onChange={e => setPassions(e.target.value)}
        />
      </div> */}

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default UserForm;