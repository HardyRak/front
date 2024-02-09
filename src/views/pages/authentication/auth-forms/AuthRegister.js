import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { listGenre } from "../../../../service/GenreService";
import { listnationaliter } from "../../../../service/NationaliterService";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserEntityService from "../../../../service/UserEntityService";

const FirebaseRegister = () => {
  const [genres, setGenres] = useState([]);
  const [pays, setPays] = useState([]);
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  useEffect(() => {
    fetchGenres(); 
    fetchPays();
  }, []);

  const fetchPays = async () => {
    try {
      const response = await listnationaliter();
      setPays(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => { 
    try {
      const response = await listGenre();
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Inscription</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          mail: '',
          username: '',
          prenoms: '',
          password: '',
          genre: '',
          nationalite: '',
          dateNaissance: ''
        }}
        validationSchema={Yup.object().shape({
          mail: Yup.string().email('E-Mail non valide').max(255).required('E-Mail requis'),
          username: Yup.string().max(255).required('Nom requis'),
          prenoms: Yup.string().max(255).required('Prénom requis'),
          password: Yup.string().max(255).required('Mot de passe requis'),
          genre: Yup.string().required('Genre requis'),
          nationalite: Yup.string().required('Nationalité requise'),
          dateNaissance: Yup.string().required('Date de naissance requise')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log('Valeurs du formulaire soumises :', values);
            UserEntityService.register(values);
            alert("Inscription reussi");
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error("Insertion faild");
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >

        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  margin="normal"
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  margin="normal"
                  name="prenoms"
                  type="text"
                  value={values.prenoms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.prenoms && Boolean(errors.prenoms)}
                  helperText={touched.prenoms && errors.prenoms}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date de naissance"
                  margin="normal"
                  name="dateNaissance"
                  type="date"
                  value={values.dateNaissance}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dateNaissance && Boolean(errors.dateNaissance)}
                  helperText={touched.dateNaissance && errors.dateNaissance}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.genre && Boolean(errors.genre)}>
                  <InputLabel id="genre-label">Genre</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre"
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">Sélectionnez le genre</MenuItem>
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.id}>{genre.nom}</MenuItem>
                    ))}
                  </Select>
                  {touched.genre && errors.genre && (
                    <FormHelperText error>{errors.genre}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.nationalite && Boolean(errors.nationalite)}>
                  <InputLabel id="pays-label">Pays</InputLabel>
                  <Select
                    labelId="pays-label"
                    id="nationalite"
                    name="nationalite"
                    value={values.nationalite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">Sélectionnez votre pays</MenuItem>
                    {pays.map((pay) => (
                      <MenuItem key={pay.id} value={pay.id}>{pay.nom}</MenuItem>
                    ))}
                  </Select>
                  {touched.nationalite && errors.nationalite && (
                    <FormHelperText error>{errors.nationalite}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                    <FormControl fullWidth error={touched.email && Boolean(errors.email)}>
                      <InputLabel htmlFor="outlined-adornment-email-register">Adresse E-Mail</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-register"
                        type="mail"
                        value={values.mail}
                        name="mail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error>{errors.email}</FormHelperText>
                      )}
                    </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.password && Boolean(errors.password)}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box mb={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Box mt={2}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Inscription
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
