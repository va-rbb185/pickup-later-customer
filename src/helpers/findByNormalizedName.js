import { normalizeForURLs } from '.';

const findByNormalizedName = (normalizedNameToSearch, searchArray) => {
    return searchArray.find(
        item => normalizedNameToSearch === normalizeForURLs(item.name)
    );
};

export default findByNormalizedName;
