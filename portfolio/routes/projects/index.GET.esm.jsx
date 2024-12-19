import organisation from "../@[org]/index.GET.esm.jsx";
export default async function projects () {
    return await organisation.call(this)
}