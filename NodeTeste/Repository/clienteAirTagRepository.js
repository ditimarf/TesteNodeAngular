var { ExecuteQuery } = require('./repositoryBase')

async function ObterAirTagsPorCliente(codigoCliente) {
    return await ExecuteQuery('SELECT t1."Codigo", "MAC", "AliasTag", "DataInicioLocacao", "DataFimLocacao" \
                                FROM public."ClienteAirTag" t1 \
                                INNER JOIN public."AirTags" t2 \
                                    ON t1."CodigoAirTag" = t2."Codigo" \
                                WHERE "CodigoCliente" = $1\
                                ORDER BY t1."DataFimLocacao" DESC', [codigoCliente])
}

async function DevolverAirTag(codigoLocacao) {
    return await ExecuteQuery('UPDATE public."ClienteAirTag"\
                                SET "DataFimLocacao" = NOW()\
                                WHERE "Codigo" = $1', [codigoLocacao])
}

async function InserirLocacaoAirTag(codigoCliente, codigoAirTag, alias) {
    return await ExecuteQuery('INSERT INTO public."ClienteAirTag"( \
	                            "CodigoCliente", "CodigoAirTag", "DataInicioLocacao", "DataFimLocacao", "AliasTag") \
	                            VALUES ($1, $2, NOW(), NULL, $3)', [codigoCliente, codigoAirTag, alias])
}

module.exports =
{
    ObterAirTagsPorCliente,
    DevolverAirTag,
    InserirLocacaoAirTag
}