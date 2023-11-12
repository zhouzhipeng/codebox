import sqlparse

line = '''
create table IF NOT EXISTS article(
    id integer primary key,
    title varchar(255) not null,
    content text
)

'''

def get_table_name(tokens):
    for token in reversed(tokens):
        if token.ttype is None:
            return token.value
    return " "

parse = sqlparse.parse(line)
for stmt in parse:
    # Get all the tokens except whitespaces
    tokens = [t for t in sqlparse.sql.TokenList(stmt.tokens) if t.ttype != sqlparse.tokens.Whitespace]
    is_create_stmt = False
    for i, token in enumerate(tokens):
        # Is it a create statements ?
        if token.match(sqlparse.tokens.DDL, 'CREATE'):
            is_create_stmt = True
            continue

        # If it was a create statement and the current token starts with "("
        if is_create_stmt and token.value.startswith("("):
            # Get the table name by looking at the tokens in reverse order till you find
            # a token with None type
            print (f"table: {get_table_name(tokens[:i])}")

            # Now parse the columns
            txt = token.value
            columns = txt[1:txt.rfind(")")].replace("\n","").split(",")
            for column in columns:
                c = ' '.join(column.split()).split()
                c_name = c[0].replace('\"',"")
                c_type = c[1]  # For condensed type information
                # OR
                #c_type = " ".join(c[1:]) # For detailed type information
                print (f"column: {c_name}")
                print (f"date type: {c_type}")
            print ("---"*20)
            break