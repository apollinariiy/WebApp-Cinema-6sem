import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import MoviesContainer from './components/MoviesContainer';
import { Provider } from 'react-redux';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Route, Routes, Navigate } from 'react-router-dom';
import BuyingFrom from './components/BuyingForm';
import SeatsContainer from './components/SeatsContainer';
import Header from './components/Header';
import SignUp from './components/SingUpForm';
import ProfilePage from './components/ProfilePage';
import FullMovieItem from './components/FullMovieItem';
import MoviesManagement from './components/Admin/AdminMovie/MovieAddComponent';
import MovieUpdateComponent from './components/Admin/AdminMovie/MovieUpdateComponent';
import SessionAddComponent from './components/Admin/AdminSessionComponents/SessionAddComponent';
import SessionUpdateComponent from './components/Admin/AdminSessionComponents/SessionUpdateComponent';
import UserMenegerComponent from './components/Admin/UserMenegerComponent';
import HallAddComponent from './components/Admin/AdminHall/HallAddComponent';
import HallUpdateComponent from './components/Admin/AdminHall/HallUpdateComponent';
import HallMenegerComponent from './components/Admin/AdminHall/HallMenegerComponent';
import MovieMenegerComponent from './components/Admin/AdminMovie/MovieMeneger';
import MoviesAddComponent from './components/Admin/AdminMovie/MovieAddComponent';
import SessionMenegerComponent from './components/Admin/AdminSessionComponents/SessionMeneger';
import ReservMenegerComponent from './components/Admin/AdminReserv/ReservMeneger';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6a1b9a',
    },
  },
  typography: {
    allVariants: {
      color: '#d9d7d7'
    }
  }
});


function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      await store.checkAuth();
    }
  }, []);


  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <Header></Header>
        <Routes>
          <Route exact path='/' element={<MoviesContainer />} />
          {
            (!store.isAuth) &&
            <><Route path='/singin' element={<LoginForm />} />
              <Route path='/singup' element={<SignUp />} />
            </>
          }
          {
            (store.user.role === 'USER') && <>
              <Route path='/profile' element={<ProfilePage />} />
            </>
          }
          {(store.user.role === 'ADMIN') && <>
            <Route path='/admin/user' element={<UserMenegerComponent />} />

            <Route path='/admin/hall/create' element={<HallAddComponent />} />
            <Route path='/admin/hall/update/:hallID' element={<HallUpdateComponent />} />
            <Route path='/admin/hall' element={<HallMenegerComponent />} />

            <Route path='/admin/session/create' element={<SessionAddComponent />} />
            <Route path='/admin/session/update/:sessionID' element={<SessionUpdateComponent />} />
            <Route path='/admin/session' element={<SessionMenegerComponent />} />

            <Route path='/admin/reserv' element={<ReservMenegerComponent />} />

            <Route path='/admin/movie' element={<MovieMenegerComponent />} />
            <Route path='/admin/movie/create' element={<MoviesAddComponent />} />
            <Route path='/admin/movie/update/:movieID' element={<MovieUpdateComponent />} />
          </>}
          <Route path='/buy/:movieID' element={<BuyingFrom />} />
          <Route path='/movie/:movieID' element={<FullMovieItem />} />
          <Route path='*' element={<MoviesContainer />} />
          <Route path='/seats/:sessionID' element={<SeatsContainer />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );

}

export default observer(App);
