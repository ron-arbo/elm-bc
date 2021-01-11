import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import CameraIcon from '@material-ui/icons/PhotoCamera';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ron Arbo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// Removes a book from the DB
function removeBook(bookID) {
  axios
  .get("/posts/deleteBook/" + bookID)
  .then(res => {
    console.log("Object Succesfully Deleted")
    console.log("Results:\n" + res)
  })
  .catch(err => {
    console.log(err)
  })
}

// Fills in completed/potential books array
function fillCompArr(funcToFill) {
  // Make request to get comp books, use function to fill array
  axios.get("/posts/compBooks").then(res => {
    funcToFill(res.data)
  })
}
function fillPotArr(funcToFill) {
  // Make request to get pot books, use function to fill array
  axios.get("/posts/potBooks").then(res => {
    funcToFill(res.data)
  })
}

export default function Album() {
  const classes = useStyles();
  const [showComp, showCompReads] = useState(false)
  const [showPot, showPotReads] = useState(false)
  const [compCards, setCompCards] = useState([]);
  const [potCards, setPotCards] = useState([]);

  // Define onClick function for completed and potential reads
  // Function will change boolean var to display books and fill respective book array
  function compOnClick(){
    showCompReads(!showComp)
    fillCompArr(setCompCards)
  }
  function potOnClick(){
    showPotReads(!showPot)
    fillPotArr(setPotCards)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ImportContactsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Elm BC
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Elm BC
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.""
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => compOnClick()}>
                    Completed Reads
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => potOnClick()}>
                    Potential Reads
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <div id="books">
            {showComp ? <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <h2><u>Completed Reads:</u></h2>
            <h4>Total Books: {compCards.length}  |  Total Pages: {compCards.reduce((total, current) => total = total + current.pageCount, 0)}</h4>
            <Grid container spacing={4}>
                {compCards.map((book) => (
                <Grid item key={book.title} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        // Hardcode temp
                        image={book.thumbnail}
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            <a style={{ color: '#000000' }} href={book.infoLink}>{book.title}</a>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            {book.authors.toString()}
                        </Typography>
                        <Typography>
                            {book.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" target="_blank" href={book.infoLink}>
                         Details
                        </Button>
                        <Button size="small" color="primary" target="_blank" onClick={() => removeBook(book._id)}>
                         Remove
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container> : <>
            </>
            }
            {showPot ? <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <h2><u>Potential Reads:</u></h2>
            <h4>Total Books: {potCards.length}  |  Total Pages: {potCards.reduce((total, current) => total = total + current.pageCount, 0)}</h4>
            <Grid container spacing={4}>
                {potCards.map((book) => (
                <Grid item key={book.title} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={book.thumbnail}
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            <a style={{ color: '#000000' }} href={book.infoLink}>{book.title}</a>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            {book.authors.toString()}
                        </Typography>
                        <Typography>
                            {book.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" href={book.infoLink}>
                        Details
                        </Button>
                        <Button size="small" color="primary" onClick={() => removeBook(book._id)}>
                        Remove
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container> : <>
            </>
            }
            
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer} >
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Very Important Info Down Here
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
