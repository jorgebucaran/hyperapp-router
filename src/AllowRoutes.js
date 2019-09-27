import {h} from 'hyperapp';
import {Redirect} from "./";

export default({
    if: _if,
    redirectTo = '/'
}, children) => {
    const redirect = () => <Redirect to={redirectTo}/>;

    if (!_if && window.location.pathname !== redirectTo && children.length)
        redirect();

    if (_if)
        return children;

    return null;
}
