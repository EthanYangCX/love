import "purecss/build/pure.css";
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { 
  Avatar, Button, CardActionArea, CardActions,
  Chip, Container, Stack, Typography,
  Card, CardContent, CardMedia,
  InputLabel, MenuItem, FormControl, Select,
  CssBaseline
} from '@mui/material';
import PostCard from "./components/PostCard";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from './pages/Blog'

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const eStart = new Date('1997-03-06T06:06:06+08:00')
  const fStart = new Date('1997-10-13T03:06:06+08:00')
  const loveStart = new Date('2022-03-27T06:06:06+00:00')
  const [loveDura, setLoveDura] = useState(new Date(Date.now() - loveStart));
  const [eDura, setEDura] = useState(new Date(Date.now() - eStart));
  const [fDura, setFDura] = useState(new Date(Date.now() - fStart));
  const [blogList, setBlogList] = React.useState([]);

  function dayNumberFromLove(date) {
    return Math.floor(new Date(new Date(date) - loveStart) / (1000*60*60*24));
  }

  const [lang, setLang] = React.useState('tto-bro');

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoveDura(new Date(Date.now() - loveStart));
      setEDura(new Date(Date.now() - eStart));
      setFDura(new Date(Date.now() - fStart));
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const text = await (await fetch(process.env.PUBLIC_URL + '/blogs/' + 'blog-list.txt')).text();
      // console.log(process.env.PUBLIC_URL + '/blogs/' + 'blog-list.txt');
      setBlogList(text.split(/\r?\n/));
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(blogList);
  }, [blogList]);

  const titles = new Map();
  titles.set('0710', {
    "en": "A Photo of Us Taken in the Lift in O'Shea, Jul 10",
    "zh-Hant": "????????????????????????",
    "zh-Hans": "????????????????????????",
    "tto-bro": "OFWQae D8aH3mae X8ihTeaF3 Zo2Xoe",
    "tto": "Nomo X vVoH aH SeNm aHN oWaa aH Zo2Xoe",
  });
  titles.set("main", {
    "en": "Our Love",
    "zh-Hant": "????????????",
    "zh-Hans": "????????????",
    "tto-bro": "Z72VoH DaA Oie3",
    "tto": "ie S vVoH",
  })
  titles.set("0605", {
    "en": "First Trip",
    "zh-Hant": "???????????????",
    "zh-Hans": "???????????????",
    "tto-bro": "D8ae3Oemce3 Sei2EdF",
    "tto": "Sei2 e Jei",
  })
  titles.set("0131", {
    "en": "The First Time We Met",
    "zh-Hant": "???????????????",
    "zh-Hans": "???????????????",
    "tto-bro": "D8ae3Oemce3 CeRZ6eA",
    "tto": "X8FRQ3 e Jei",
  })
  titles.set("f0", {
    "en": "Drama Coming to Edinburgh",
    "zh-Hant": "??????????????????",
    "zh-Hans": "??????????????????",
    "tto-bro": "GQRFVQR2 9eA9eRZ hvo3Oae3",
    "tto": "cs ae S DKRVR",
  })
  titles.set("e0", {
    "en": "Dramo Coming to Edinburgh",
    "zh-Hant": "??????????????????",
    "zh-Hans": "??????????????????",
    "tto-bro": "GQRFVQeaF 9eA9eRZ hvo3Oae3",
    "tto": "cs ae S DKRVo",
  })

  return (
    <div>
      <Container maxWidth="sm">
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{p: 3}}>
        
        <FormControl >
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"zh-Hant"}>????????????</MenuItem>
            <MenuItem value={"zh-Hans"}>????????????</MenuItem>
            <MenuItem value={"tto-bro"}>b8Q7Z2D8FA</MenuItem>
            <MenuItem value={"tto"}>mim</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" 
                onClick={colorMode.toggleColorMode}
                color="inherit"
                startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}>
            Theme
        </Button>
      </Stack>

      <Stack spacing={2}>
        <Typography  variant="h2">
          {titles.get("main")[lang]}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip
            avatar={<Avatar alt="avatar e" src="https://yangchnx.github.io/love/pic/avatarE.jpg" />}
            label={Math.floor(eDura / (1000*60*60*24))}
          />
          <Chip
            avatar={<Avatar alt="avatar f" src="https://yangchnx.github.io/love/pic/avatarF.jpg" />}
            label={Math.floor(fDura / (1000*60*60*24))}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
              avatar={<Avatar alt="avatar heart" src="https://yangchnx.github.io/love/icons8-love.gif" />}
              label={Math.floor(loveDura/ (1000*60*60*24)) + ' days and ' 
                    + loveDura.getHours().toString().padStart(2, '0') + ':' 
                    + loveDura.getMinutes().toString().padStart(2, '0') + ':'
                    + loveDura.getSeconds().toString().padStart(2, '0')}
          />
        </Stack>

        {blogList.map(blogName =>
          <Link to={"/love/" + blogName} key={blogName}>{blogName}</Link>
        )}

        {/* TODO: make PostCard compatible with links*/}
        <Typography variant="h4">
          (Below is the Old Version Website to be Archived)
        </Typography>
        <Card sx={{}}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://yangchnx.github.io/love/pic/2022-0710-1-1.jpeg"
              alt="photo of us taken at elevator"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {titles.get("0710")[lang]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayNumberFromLove('2022-07-10T17:03+01:00')} ?????? ?????????qou-sreej????????????O'Shea?????????????? S??aghdha?????????????????????????????????????????????
                ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="https://v.douyin.com/23VEsxg/">
              Video
            </Button>
          </CardActions>
        </Card>

        <PostCard 
          image="https://yangchnx.github.io/love/pic/2022-0605-1-1.jpg"
          alt="sweet hug in front of Westminster Abbey"
          title={titles.get("0605")[lang]}
          main={dayNumberFromLove('2022-06-05T18:00+01:00') + 
                " ?????? ?????????lon-don????????????London?????????????????????myinq?????????????????????"} 
        />

        <PostCard 
          image="https://yangchnx.github.io/love/pic/2022-0131-1-1.jpeg"
          alt="happy new year"
          title={titles.get("0131")[lang]}
          main={dayNumberFromLove('2022-01-31T19:00+00:00') + 
                " ?????? ???????????????????????????????????????????????????????????????????????????????????????????????????"}
        />

        <PostCard 
          image="https://yangchnx.github.io/love/pic/for-2021-1003-0100.jpeg"
          alt="F before edinburgh"
          title={titles.get("f0")[lang]}
          main={dayNumberFromLove('2021-10-03T01:00+08:00') + 
                " ?????? ???????????????djyangq-heojq??????????????????qejh-den????????????Edinburgh???????????????D??n ??ideann?????????????????????????????????????????????"}
        />

        <PostCard 
          image="https://yangchnx.github.io/love/pic/for-2021-0915-1600.jpg"
          alt="E before edinburgh"
          title={titles.get("e0")[lang]}
          main={dayNumberFromLove('2021-09-15T16:00+08:00') + 
                " ?????? ???????????????sjim-tjwinh??????????????????qejh-den????????????Edinburgh???????????????D??n ??ideann?????????????????????????????????????????????"}
        />

      </Stack>
      </Container>
    </div>
  );
}

export default function AppWithColorToggler() {
  const [mode, setMode] = React.useState('light');
  const [blogList, setBlogList] = React.useState([]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const text = await (await fetch(process.env.PUBLIC_URL + '/blogs/' + 'blog-list.txt')).text();
      // console.log(process.env.PUBLIC_URL + '/blogs/' + 'blog-list.txt');
      setBlogList(text.split(/\r?\n/));
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(blogList);
  }, [blogList]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
        <Route path="/love" element={<App />} />
        <Route path="/love/:blogName" element={<Blog ColorModeContext={ColorModeContext} />} />
        </Routes>
      </BrowserRouter>
      
        {/* <App /> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
