export default function test () {
    throw {
        name: Deno.errors.NotSupported.name,
        status: 501
    }
}