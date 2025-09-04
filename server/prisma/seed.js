// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // --- Departments ---
    //     const departments = await prisma.department.createMany({
    //         data: [
    //             { code: "CS", name: "Computer Science" },
    //             { code: "ENG", name: "Engineering" },
    //             { code: "MATH", name: "Mathematics" },
    //             { code: "BUS", name: "Business Administration" },
    //         ],
    //     });

    const allDepartments = await prisma.department.findMany();

    // --- Users ---
    const users = [];
    for (let i = 0; i < 20; i++) {
        const user = await prisma.user.create({
            data: {
                firebaseUid: faker.string.uuid(),
                email: faker.internet.email(),
                username: faker.person.fullName(),
                matricNo: faker.string.alphanumeric(8),
                password: faker.word.preposition(),
                departmentId: faker.helpers.arrayElement(allDepartments).id,
                profile: {
                    create: {
                        bio: faker.lorem.sentence(),
                        displayName: faker.person.fullName(),
                        picture: faker.image.avatar(),
                    },
                },
            },
        });
        users.push(user);
    }

    // --- Channels ---
    const channelNames = [
        "general",
        "random",
        "anonymous",
        "events",
        "marketplace",
    ];
    const channels = [];
    for (const name of channelNames) {
        const creator = faker.helpers.arrayElement(users);
        const channel = await prisma.channel.create({
            data: {
                name,
                slug: name,
                createdById: creator.id,
                visibility: "PUBLIC",
            },
        });
        channels.push(channel);
    }

    // --- Channel Members ---
    for (const channel of channels) {
        const shuffled = faker.helpers.shuffle(users);
        const members = shuffled.slice(
            0,
            faker.number.int({ min: 5, max: 15 })
        );
        for (const member of members) {
            await prisma.channelMember.create({
                data: {
                    channelId: channel.id,
                    userId: member.id,
                    role: faker.helpers.arrayElement([
                        "OWNER",
                        "ADMIN",
                        "MEMBER",
                    ]),
                },
            });
        }
    }

    // --- Messages ---
    for (const channel of channels) {
        for (let i = 0; i < faker.number.int({ min: 5, max: 15 }); i++) {
            const author = faker.helpers.arrayElement(users);
            await prisma.message.create({
                data: {
                    channelId: channel.id,
                    authorId: author.id,
                    content: faker.lorem.sentence(),
                    attachments: [],
                },
            });
        }
    }

    // --- Posts & Comments ---
    for (const user of users) {
        const post = await prisma.post.create({
            data: {
                authorId: user.id,
                title: faker.lorem.words(5),
                content: faker.lorem.paragraph(),
                tags: ["campus", "project", "study"],
                mentions: [],
            },
        });

        for (let i = 0; i < 3; i++) {
            const commenter = faker.helpers.arrayElement(users);
            await prisma.comment.create({
                data: {
                    postId: post.id,
                    authorId: commenter.id,
                    content: faker.lorem.sentence(),
                },
            });
        }
    }

    // --- Events & Attendees ---
    for (let i = 0; i < 5; i++) {
        const creator = faker.helpers.arrayElement(users);
        const event = await prisma.event.create({
            data: {
                title: faker.lorem.words(3),
                description: faker.lorem.sentence(),
                location: faker.location.city(),
                banner: faker.image.url(),
                startsAt: faker.date.future(),
                endsAt: faker.date.future(),
                createdById: creator.id,
                channelId: faker.helpers.arrayElement(channels).id,
            },
        });

        const attendees = faker.helpers.shuffle(users).slice(0, 10);
        for (const attendee of attendees) {
            await prisma.eventAttendee.create({
                data: {
                    eventId: event.id,
                    userId: attendee.id,
                },
            });
        }
    }

    // --- Reactions ---
    const messages = await prisma.message.findMany();
    for (const message of messages) {
        const reactors = faker.helpers.shuffle(users).slice(0, 3);
        for (const reactor of reactors) {
            await prisma.reaction.create({
                data: {
                    type: faker.helpers.arrayElement([
                        "LIKE",
                        "LOVE",
                        "LAUGH",
                        "WOW",
                    ]),
                    userId: reactor.id,
                    messageId: message.id,
                },
            });
        }
    }

    console.log("✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
