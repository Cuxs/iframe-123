import React, { Component } from 'react';
import './sass/main.scss';
import Select from 'react-select';
import { prepareArraySelect } from './helpers';
import { get123Brands, get123Years, get123Family,get123Models,get123Provinces } from './helpers/fetches'

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allYears: [],
      allBrands: [],
    }
    this.handleQuoting = this.handleQuoting.bind(this);
  }
  componentDidMount() {
    get123Brands()
      .then((res) => {
        this.setState({
          allBrands: res.data,
        });
      });
  }
  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      codia: null,
      year: null,
    });
    get123Years(newBrand.value)
      .then((res) => {
        this.setState({ allYears: res.data });
      });
  }
  onChangeYear(newYear) {
    this.setState({ year: newYear, allFamilies: [], allModels: [] });
    get123Family(this.state.brand.value, newYear.value)
      .then((resp) => {
        this.setState({ allFamilies: resp.data });
      });
  }
  onChangeFamily(newGroup) {
    this.setState({
      family: newGroup,
      codia: null,
      allModels: [],
    });
    get123Models(this.state.brand.value, this.state.year.value, newGroup.value)
      .then((res) => {
        this.setState({ allModels: res.data });
      });
  }
  onChangeModel(newModel) {
    this.setState({
      codia: newModel,
    });
  }
  handleQuoting() {
    this.setState({ loading: true, loadingText: 'Conectandose con 123seguro...' });
    const {
      brand, family, codia, year,
    } = this.state;
    if (brand !== null && family !== null && codia !== null && year !== null) {
      get123Provinces()
        .then((resp) => {
          this.setState({ provinceList: resp.data, showBottomSection: true, loading: false });
        })
        .catch(error => console.log(error));
    }
  }
  render() {
    return (
      <div>
          <h4>Cotizá un seguro para tu auto</h4>
        <div className="container-123">
          <div className="d-flex" >
            <div className="col-lg-3 col-md-6 p-0" >
              <Select
                id="brand-select"
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                options={prepareArraySelect(this.state.allBrands, 'id', 'nombre')}
                simpleValue
                clearable
                name="selected-state"
                value={this.state.brand}
                placeholder="Marca"
                onChange={newValue => this.onChangeBrand(newValue)}
                searchable
                noResultsText="No se encontraron resultados"
                theme={theme => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary25: '#D2DCD4',
                    primary: '#2A3B59',
                  },
                })
                }
              />
            </div>
            <div className="col-lg-1 col-md-6 p-0" >
              <Select
                id="year-select"
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                options={this.state.allYears.map(row => ({ value: row, label: row }))}
                simpleValue
                clearable
                required
                name="selected-state"
                value={this.state.year}
                placeholder="Año"
                onChange={newValue => this.onChangeYear(newValue)}
                searchable
                noResultsText="No se encontraron resultados"
                theme={theme => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary25: '#D2DCD4',
                    primary: '#2A3B59',
                  },
                })
                }
              />
            </div>
            <div className="col-lg-3 col-md-6 p-0" >
              <Select
                id="groups-select"
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                options={prepareArraySelect(this.state.allFamilies, 'id', 'nombre')}
                simpleValue
                clearable
                name="selected-state"
                value={this.state.family}
                placeholder="Familia"
                onChange={newValue => this.onChangeFamily(newValue)}
                searchable
                noResultsText="No se encontraron resultados"
                theme={theme => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary25: '#D2DCD4',
                    primary: '#2A3B59',
                  },
                })
                }
              />
            </div>
            <div className="col-lg-3 col-md-6 p-0" >
              <Select
                id="models-select"
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                options={prepareArraySelect(this.state.allModels, 'id', 'nombre')}
                simpleValue
                clearable
                name="selected-state"
                value={this.state.codia}
                placeholder="Modelo"
                onChange={newValue => this.onChangeModel(newValue)}
                searchable
                noResultsText="No se encontraron resultados"
                theme={theme => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary25: '#D2DCD4',
                    primary: '#2A3B59',
                  },
                })
                }
              />
            </div>
            <button color="" className="btn btn-primary btn-block" onClick={this.handleQuoting}>Cotizar</button>
          </div>
          <div className="d-flex justify-content-end" >
            <img src="/assets/123seguro-logo.svg" alt="" className="logo" />
          </div>
        </div>
        {this.state.showBottomSection &&<div>ALO!</div>}
      </div>
    );
  }
}

export default Step1;
