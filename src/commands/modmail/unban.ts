import { command } from "../../structs/commands";
import { SlashCommandBuilder } from "discord.js";
import { errorEmbed, successEmbed } from "../../interfaces/functions";

export default new command({
    command_data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans user from mod mail')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to unban.')
                .setRequired(true)
        )
        .setDMPermission(false)
        .toJSON(),
    run: async (client, interaction, args) => {
        const user = args.getUser('user');

        let data_check = client.bans_db.get(user.id);

        if (!data_check) {
            await interaction.reply({
                embeds: [
                    errorEmbed('The user is already unbanned.')
                ],
                ephemeral: true
            });

            return;
        };

        client.bans_db.del(user.id);

        await interaction.reply({
            embeds: [
                successEmbed('The user <@' + user.id + '> has been successfully unbanned')
            ],
            ephemeral: true
        });

        return;
    }
});
    