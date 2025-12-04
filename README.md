# Data Sync CLI

A powerful command-line tool for real-time data synchronization across heterogeneous data sources.

## Installation

```bash
npm install -g data-sync-cli
```

## Quick Start

```bash
dsync sync <source> -d <destination> -m <mode>
```

## Commands

### sync

Synchronize data between sources.

**Usage:**

```bash
dsync sync postgres-db -d mysql-target -m incremental
```

**Modes:**

- `full`: Complete data copy (may take time depending on volume)
- `incremental`: Only sync changed records
- `bidirectional`: Sync in both directions (TODO: conflict resolution strategy TBD)

**Options:**

- `-d, --destination`: Target location/endpoint
- `-m, --mode`: Sync mode (default: incremental)
- `--config`: Path to config file

**Note:** For production use, ensure your sources are configured in `config/sources.json`.

### validate

Check data integrity between source and destination.

```bash
dsync validate postgres-db --strict
```

**Options:**

- `--strict`: Apply strict validation rules (currently undefined what these are)

### transform

Convert data between formats.

```bash
dsync transform input.json -o output.csv -t csv
```

**Supported formats:** json, csv, xml
(Note: XML support is partial - see known limitations)

### status

Display current sync queue and statistics.

```bash
dsync status
```

## Configuration

Create a `config.json` file:

```json
{
  "mode": "incremental",
  "timeout": 30000,
  "retries": 3,
  "logLevel": "info"
}
```

**Missing configuration details:**

- Database connection string format
- Authentication method for remote sources
- How to configure multiple simultaneous syncs
- Webhook notification format and retry policy

## Architecture

The tool uses a queue-based architecture with connection pooling (TODO: implement).

**Components:**

- `SyncManager`: Orchestrates sync operations
- `ConfigLoader`: Loads configuration
- `DataTransformer`: Handles format conversion

**Known Issues:**

- XML transformation uses O(n²) algorithm - performance degrades on large files
- Bidirectional sync may create conflicts without resolution strategy
- No transaction support - partial syncs possible if interrupted

## Advanced Usage

### Real-time Bidirectional Sync

Enable continuous bidirectional synchronization:

```bash
dsync sync source1 -d source2 -m bidirectional --config config.json
```

**WARNING:** Conflict resolution strategy is not yet defined. System may enter inconsistent state if simultaneous writes occur on both sources.

## Testing

```bash
npm test
```

## Limitations & TODOs

- [ ] Delta calculation for incremental sync
- [ ] Transaction support to prevent partial syncs
- [ ] Exponential backoff for failed sync retries
- [ ] YAML config file support
- [ ] Webhook notification system
- [ ] Database connection pooling
- [ ] Schema validation
- [ ] Streaming support for large files
- [ ] Actual implementation of transform operations

## License

MIT
