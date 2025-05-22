using CommandLine;
using System;

namespace IdsTool;

public static class Program
{
    public static int Main(string[] args)
    {
        return Parser.Default
            .ParseArguments<BatchAuditOptions>(args)
            .MapResult(RunAudit, _ => 1);
    }

    private static int RunAudit(BatchAuditOptions options)
    {
        // Placeholder: integrate with IdsLib to perform the audit.
        Console.WriteLine($"Auditing source: {options.InputSource}");
        Console.WriteLine($"Schema files: {string.Join(',', options.SchemaFiles)}");
        Console.WriteLine($"Audit schema definition: {options.AuditSchemaDefinition}");
        Console.WriteLine($"Input extension: {options.InputExtension}");
        Console.WriteLine($"Omit content audit: {options.OmitIdsContentAudit}");
        Console.WriteLine($"Omit content audit pattern: {options.OmitIdsContentAuditPattern}");
        return 0;
    }
}
