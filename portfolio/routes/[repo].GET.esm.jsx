import repository from "./@[org]/[repo].GET.esm.jsx";
export default async function repo () {
    return await repository.call(this)
}