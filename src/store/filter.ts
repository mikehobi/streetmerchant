import {Link} from './model';
import {config} from '../config';

/**
 * Returns true if the brand should be checked for stock
 *
 * @param brand The brand of the GPU
 */
function filterBrand(brand: Link['brand']): boolean {
  if (config.store.excludedBrands.length !== 0) {
    return !config.store.excludedBrands.includes(brand);
  }

  if (config.store.showOnlyBrands.length !== 0) {
    return config.store.showOnlyBrands.includes(brand);
  }

  return true;
}

/**
 * Returns true if the model should be checked for stock
 *
 * @param model The model of the GPU
 * @param series The series of the GPU
 */
function filterModel(model: Link['model'], series: Link['series']): boolean {
  const sanitizedModel = model.replace(/\s/g, '');
  const sanitizedSeries = series.replace(/\s/g, '');

  if (config.store.excludedModels.length !== 0) {
    for (const configModelEntry of config.store.excludedModels) {
      const sanitizedConfigModel = configModelEntry.name.replace(/\s/g, '');
      const sanitizedConfigSeries = configModelEntry.series.replace(/\s/g, '');
      if (sanitizedConfigSeries) {
        if (
          sanitizedSeries === sanitizedConfigSeries &&
          sanitizedModel === sanitizedConfigModel
        ) {
          return false;
        }
      } else if (sanitizedModel === sanitizedConfigModel) {
        return false;
      }
    }
    return true;
  }

  if (config.store.showOnlyModels.length !== 0) {
    for (const configModelEntry of config.store.showOnlyModels) {
      const sanitizedConfigModel = configModelEntry.name.replace(/\s/g, '');
      const sanitizedConfigSeries = configModelEntry.series.replace(/\s/g, '');
      if (sanitizedConfigSeries) {
        if (
          sanitizedSeries === sanitizedConfigSeries &&
          sanitizedModel === sanitizedConfigModel
        ) {
          return true;
        }
      } else if (sanitizedModel === sanitizedConfigModel) {
        return true;
      }
    }
    return false;
  }
  return true;
}

/**
 * Returns true if the series should be checked for stock
 *
 * @param series The series of the GPU
 */
export function filterSeries(series: Link['series']): boolean {
  if (config.store.showOnlySeries.length === 0) {
    return true;
  }

  return config.store.showOnlySeries.includes(series);
}

/**
 * Returns true if the link should be checked for stock
 *
 * @param link The store link of the GPU
 */
export function filterStoreLink(link: Link): boolean {
  return (
    filterBrand(link.brand) &&
    filterModel(link.model, link.series) &&
    filterSeries(link.series)
  );
}
