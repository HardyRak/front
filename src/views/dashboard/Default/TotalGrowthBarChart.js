import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AnnonceService from '../../../service/AnnonceService';
// Sample image in base64 format

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [annonces, setAnnonce] = useState([]);
  const { navType } = customization;
  const { primary } = theme.palette.text;

  useEffect(() => {
    fetchAnnonce(); 
  }, []);

  const fetchAnnonce = async () => {
    try {
      const response = await AnnonceService.getAllAnnonces();
      setAnnonce(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  }, [navType, primary, isLoading]);

  return (
    <>
      
      {annonces.map((annonce,index) => (
        <MainCard key={index}>
        <Grid container spacing={gridSpacing} >
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">Voiture</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3"></Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Category: {annonce.categorieId}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Marque: {annonce.marqueId}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Modele: {annonce.modele}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Type Moteur: {annonce.typeMoteurId}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Consommation: {annonce.consommation}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">NombrePlace: {annonce.nombrePlace}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Nombre Place: {annonce.nombrePlace}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Nombre Porte: {annonce.nombrePorte}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Annee: {annonce.annee}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Kilometrage: {annonce.kilometrage}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Prix: {annonce.prix} Ariary</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <img src={annonce.images[0].base64} alt="Sample" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>
        </MainCard>
      ))}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
