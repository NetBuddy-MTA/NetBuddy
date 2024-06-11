using Marten;
using Marten.Schema;
using NetBuddy.Server.Models.Executables.Action;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Data;

public sealed class PopulateActions : IInitialData
{
    private readonly Action[] _actions =
    [
        // Create a new chrome window to work in
        new Action
        {
            DisplayName = "Create New Window",
            ActionString = "CreateWindow",
            Description = "Creates a new browser window",
            Category = "Browser",
            Inputs = [
            ],
            Outputs = [
                new Variable
                {
                    Name = "Window",
                    Description = "The window that was created",
                    Type = "Window"
                }
            ]
        },
        // Close a window
        new Action
        {
            DisplayName = "Close Window",
            ActionString = "CloseWindow",
            Description = "Closes the provided window",
            Category = "Browser",
            Inputs = [
                new Variable
                {
                    Name = "Window",
                    Description = "The window to close",
                    Type = "Window"
                }
            ],
            Outputs = [
            ]
        },
        // Create a new tab action
        new Action
        {
            DisplayName = "Create New Tab",
            ActionString = "CreateTab",
            Description = "Creates a new tab in the browser",
            Category = "Browser",
            Inputs = [
                new Variable
                {
                    Name = "Window",
                    Description = "The window to create the tab in",
                    Type = "Window"
                },
                new Variable
                {
                    Name = "Url",
                    Description = "The URL of the page to open (Optional)",
                    Type = "URL",
                    Optional = true
                }
            ],
            Outputs = [
                new Variable
                {
                    Name = "Tab",
                    Description = "The tab that was created",
                    Type = "Tab"
                }
            ]
        },
        // Navigate to URL action
        new Action
        {
            DisplayName = "Navigate to URL",
            ActionString = "NavigateToURL",
            Description = "Navigates to a URL in the provided tab",
            Category = "Browser",
            Inputs = [
                new Variable
                {
                    Name = "Tab",
                    Description = "The tab to navigate in",
                    Type = "Tab"
                },
                new Variable
                {
                    Name = "Url",
                    Description = "The URL to navigate to",
                    Type = "URL"
                }
            ],
            Outputs = [
                new Variable
                {
                    Name = "Tab",
                    Description = "The tab that was navigated",
                    Type = "Tab"
                }
            ]
        },
        // Get elements by selector
        new Action
        {
            DisplayName = "Find Elements by Selector",
            ActionString = "FindElementsBySelector",
            Description = "Finds all elements matching the given selector in the tab",
            Category = "Extraction",
            Inputs = [
                new Variable
                {
                    Name = "Selector",
                    Description = "The selector that the elements will be matched against",
                    Type = "Selector"
                },
                new Variable
                {
                    Name = "Tab",
                    Description = "The tab to be searched",
                    Type = "Tab"
                }
            ],
            Outputs = [
                new Variable
                {
                    Name = "Elements",
                    Description = "The elements in the tab that match the selector",
                    Type = "Element[]"
                },
                new Variable
                {
                    Name = "Count",
                    Description = "The number of elements that match the selector",
                    Type = "Number"
                }
            ]
        },
        // Click element
        new Action
        {
            DisplayName = "Click Element",
            ActionString = "ClickElement",
            Description = "Clicks the provided element",
            Category = "Interactions",
            Inputs = [
                new Variable
                {
                    Name = "Element",
                    Description = "The element to be clicked",
                    Type = "Element"
                }
            ],
            Outputs = [
            ]
        },
        // Reads text from element
        new Action
        {
            DisplayName = "Read Text from Element",
            ActionString = "ReadElementText",
            Description = "Reads the text from the provided element",
            Category = "Extraction",
            Inputs = [
                new Variable
                {
                    Name = "Element",
                    Description = "The element to read from",
                    Type = "Element"
                }                
            ],
            Outputs = [
                new Variable
                {
                    Name = "Element Text",
                    Description = "The text from the element",
                    Type = "String"
                }
            ]
        },
        // Writes text to element
        new Action
        {
            DisplayName = "Write Text to Element",
            ActionString = "WriteElementText",
            Description = "Writes the provided text to the provided element",
            Category = "Interactions",
            Inputs = [
                new Variable
                {
                    Name = "Element",
                    Description = "The element to write to",
                    Type = "Element"
                },
                new Variable
                {
                    Name = "Text",
                    Description = "The text to write",
                    Type = "String"
                }
            ],
            Outputs = [
                new Variable
                {
                    Name = "Is Input",
                    Description = "True if the element is an input element, otherwise False",
                    Type = "Boolean"
                }
            ]
        },
        // http/s request
        new Action
        {
            DisplayName = "HTTP(S) Request",
            ActionString = "HttpRequest",
            Description = "Performs an HTTP(S) request",
            Category = "Requests",
            Inputs = [
                new Variable
                {
                    Name = "Url",
                    Description = "The URL to request",
                    Type = "URL"
                },
                new Variable
                {
                    Name = "Method",
                    Description = "The HTTP method to use",
                    Type = "String",
                    Optional = true,
                    DefaultValue = "GET"
                },
                new Variable
                {
                    Name = "Headers",
                    Description = "The headers to send with the request",
                    Type = "String",
                    Optional = true
                }
            ],
            Outputs = [
                new Variable
                {
                    Name = "Response",
                    Description = "The response from the request",
                    Type = "HttpResponse"
                }
            ]
        },
    ];

    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        await using var session = store.LightweightSession();
        session.Store(_actions);
        await session.SaveChangesAsync(cancellation);
    }
}