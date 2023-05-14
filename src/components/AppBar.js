// import MUI.Toolbar from "@mui/material/Toolbar";
// import MUI.IconButton from "@mui/material/IconButton";
// import MUI.Typography from "@mui/material/Typography";
// import MUI.Menu from "@mui/material/Menu";
// import MUI.Container from "@mui/material/Container";
// import MUI.Avatar from "@mui/material/Avatar";
// import MUI.Button from "@mui/material/Button";
// import MUI.Tooltip from "@mui/material/Tooltip";
// import MUI.MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Box,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  styled,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../styles/appBar.css";
import { useState } from "react";
import SearchBar from "material-ui-search-bar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "white",
  borderRadius: theme.shape.borderRadius,
  border: "0",
  backgroundColor: "rgb(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgb(255, 255, 255, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "30ch",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(SearchBar)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    // backgroundColor: alpha("#fff", 0.15),
    // "&:hover": {
    //   backgroundColor: alpha("#fff", 0.25),
    // },
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

const pages = [
  {
    key: "St. M Now",
    link: "/stmnow",
  },
  {
    key: "School",
    link: "/school",
  },
  {
    key: "Board",
    link: "/board",
  },
  {
    key: "About",
    link: "/about",
  },
];
const settings = [
  { key: "Profile", link: "/profile" },
  { key: "Account", link: "/account" },
  { key: "Logout", link: "/logout" },
];

function ResponsiveAppBar({ isLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className="link logo-link">
            <Logo
              size="md"
              color="white"
              id="appBarLogo"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "SBAggroB",
                fontWeight: 600,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              St.M Globe
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page.link}
                  className="link"
                  key={page.key}
                  onClick={handleCloseNavMenu}
                >
                  <MenuItem>
                    <Typography textAlign="center" className="typo">
                      {page.key}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link to="/" className="link logo-link">
              <Logo
                size="sm"
                color="white"
                id="appBarLogo flex"
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "SBAggroB",
                  fontWeight: 600,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                St. M Globe
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link} className="link" key={page.key}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.key}
                </Button>
              </Link>
            ))}
          </Box>
          <Search
            sx={{
              marginRight: 3,
              display: "flex",
            }}
          >
            <StyledInputBase
              onRequestSearch={console.log}
              placeholder="Search..."
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                settings.map((setting) => (
                  <Link
                    to={setting.link}
                    className="link"
                    key={setting.key}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography textAlign="center" className="typo">
                        {setting.key}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))
              ) : (
                <MenuItem key="Sign In" onClick={handleCloseUserMenu}>
                  <Link to="/signin" className="link">
                    <Typography textAlign="center" className="typo">
                      Sign In
                    </Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
