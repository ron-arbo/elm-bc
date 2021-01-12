import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      alert("Operation Successful")
      event.preventDefault();
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Add a Book:</Form.Label>
          <Form.Control type="text" value={this.state.value} onChange={this.handleChange} placeholder="Title" />
        </Form.Group>
      
        <Button value="Submit" type="submit" variant="dark">Add</Button>{' '} 
      </Form>   
       );
    }
  }

  export default NameForm;