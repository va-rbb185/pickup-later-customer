import { normalizeForURLs } from '.';

const findByNormalizedName = (nameToSearch, searchArray) => {
    return searchArray.find(
        item => nameToSearch === normalizeForURLs(item.name)
    );
};

export default findByNormalizedName;
