import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SimpleLink = styled(Link)`
    outline: none;
    text-decoration: none;

    :visited {
        color: inherit;
    }
`;

export default SimpleLink;