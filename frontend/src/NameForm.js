import React from 'react';
import axios from 'axios';

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    // Search for title with API, add first result to DB
    handleSubmit(event) {
      // Get search terms from input field, replace ' ' with '+'
      let searchParams = this.state.value
      let formattedParams = searchParams.replace(/\s+/g, '+')
      let apiString = 'https://www.googleapis.com/books/v1/volumes?q=' + formattedParams
      axios.get(apiString).then(res => {
        let firstVolume = res.data.items[0]

        // Add the first volume from the search to the database
        axios.post('/posts/addPotBook', {
            title: firstVolume.volumeInfo.title,
            authors: firstVolume.volumeInfo.authors,
            description: firstVolume.volumeInfo.description,
            pageCount: firstVolume.volumeInfo.pageCount,
            previewLink: firstVolume.volumeInfo.previewLink,
            infoLink: firstVolume.volumeInfo.infoLink,
            thumbnail: firstVolume.volumeInfo.imageLinks.thumbnail,
        }); 
      })
      alert('Book Succesfully Added!')
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Book to List:  
            <input placeholder="Title" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default NameForm;