/**
 * Enum representing the HTTP request methods.
 *
 * @ordinal {string} POST - Represents an HTTP POST request method used to send data to a server to create/update a resource.
 * @ordinal {string} GET - Represents an HTTP GET request method used to request data from a specified resource.
 * @ordinal {string} HEAD - Represents an HTTP HEAD request method used to request the headers that would be returned if the specified resource was requested with a GET request.
 * @ordinal {string} PUT - Represents an HTTP PUT request method used to send data to a server to create/update a resource.
 * @ordinal {string} PATCH - Represents an HTTP PATCH request method used to apply partial modifications to a resource.
 * @ordinal {string} DELETE - Represents an HTTP DELETE request method used to delete a specified resource.
 */
export enum RequestMethod {
    POST = "POST",
    GET = "GET",
    HEAD = "HEAD",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
};