import React, {useState} from 'react';
import BookCard from './BookCard';
import axios from 'axios';
let secrets = require('./secrets.json')

// import {
//   InputGroup,
//   Input,
//   InputGroupAddon,
//   Button,
//   FormGroup,
//   Label,
//   Spinner
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';

const elmBCID = secrets.elmBCID
const userID = secrets.userID
const apiKey = secrets.apiKey

function App() {
  const [cards, setCards] = useState([]);

  //let reqStr = "https://www.googleapis.com/books/v1/user/" + userID + "/bookshelves/" + elmBCID + "/volumes?key=" + apiKey
  let reqStr2 = "https://www.googleapis.com/books/v1/users/114611137080236628052/bookshelves/1001/volumes"
  //Axios is a client used to make http requests & retrieve respsonses
  axios
  //crossdomain true to bypass CORS
  .get(reqStr2, {crossdomain: true})
  .then(res => {
    setCards(res.data.items)
  })
  .catch(err => {
    console.log(err.response)
  })

  const handleCards = () => {
    const items = cards.map((item, i) => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }

      return (
        <div className='col-lg-4 mb-3' key={item.id}>
          <BookCard
            thumbnail={thumbnail}
            title={item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.language}
            authors={item.volumeInfo.authors}
            publisher={item.volumeInfo.publisher}
            description={item.volumeInfo.description}
            previewLink={item.volumeInfo.previewLink}
            infoLink={item.volumeInfo.infoLink}
          />
        </div>
      );
    });
    return (
      <div className='container my-5'>
        <div className='row'>{items}</div>
      </div>
    );
  };

  return (
    <div className='w-100 h-100'>
      {handleCards()}
    </div>
  );
}

export default App;
