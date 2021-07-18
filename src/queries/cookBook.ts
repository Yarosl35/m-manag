import { gql } from '@apollo/client';

const GET_MENU_ITEMS = gql`
    query {
        menu_item(order_by: {sku: asc}) {
            uuid
            sku
            name
        }
    }
`;
export default GET_MENU_ITEMS;
