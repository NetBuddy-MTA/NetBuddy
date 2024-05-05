interface Sequences {
    [key: string]: string;
}

const sequences: Sequences = {
    'sequence1': 'Sequence 1 description',
    'sequence2': 'Sequence 2 description',
    'sequence3': 'Sequence 3 description',
};

const SequenceScreen = () => {
    return (
        <div>
            <h1>Select a Sequence</h1>
            <ul>
                {Object.keys(sequences).map((sequenceId) => (
                    <li key={sequenceId}>
                        <button>
                            {sequenceId}
                        </button>
                        <p>{sequences[sequenceId]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SequenceScreen;
