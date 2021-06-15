import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Alert } from '@material-ui/lab'
import styled from 'styled-components'
import {  Navbar, Nav } from 'react-bootstrap'

import {
  Container, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, Form, TextField
} from '@material-ui/core'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;
const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;
const Home = () => (
  <div> <h2>You are inside Home Page</h2> </div>
)


const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.content}</h2>
     
    
    </div>
  )
}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)


const Users = () => (
  <div> <h2>You are in Users Page</h2> </div>
)
const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div> 
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',

    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
     
    }
  ])

  const [user, setUser] = useState(null) 
const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  const padding = {
    padding: 5
  }

return (

    <Page>
<Router>
      <Navigation>

        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </Navigation>

      <Switch>
        <Route path="/notes/:id">
          <Notes note={notes} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </Router>
      <Footer>
        <em>Note app, Department of Computer Science 2021</em>
      </Footer>
    </Page>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
export default App 